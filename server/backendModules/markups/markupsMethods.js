import MarkupsModel from '../models/markups_model';
import helpers from '../utils/helpers';

const markupsLogic = {
    applySabreMarking(markupParams){
        let isAgent = false; //Roles.userIsInRole(Meteor.user(),['agent'])? true:false; //TODO: Roles stuff for agencies

        let theRight = MarkupsModel.filter({airlineCode: markupParams.airlineCode, isAgentMarkup: isAgent}).run()
            .then((result) => {
                return result;
            });
        if (theRight.length > 0) {
            theRight = theRight[0];
            if (helpers.codeIn(theRight.destination, markupParams.destination[0]) === true && helpers.codeNotIn(theRight.notDestination, markupParams.destination[0]) === false
                && helpers.classIn(theRight.travelClass, markupParams.cabin) === true && helpers.classNotIn(theRight.classException, markupParams.cabin) === false) {
                console.log('the amount is : ' + markupParams.amount);
                var fig = 0;
                if (theRight.dealOps === 'rate' && theRight.mark === 'down') {
                    fig = markupParams.amount * (parseInt(theRight.figure) / 100);
                    console.log('mark down: ' + fig + 'markupParams.amount ' + markupParams.amount);
                    console.log(markupParams.amount - fig);
                    return parseFloat(markupParams.amount) - parseFloat(fig);
                }
                else if (theRight.dealOps === 'rate' && theRight.mark === 'up') {
                    fig = markupParams.amount * (parseInt(theRight.figure) / 100);
                    console.log('mark up: ' + fig + 'markupParams.amount ' + markupParams.amount);
                    console.log(markupParams.amount + fig);
                    return parseFloat(markupParams.amount) + parseFloat(fig);
                }
                else if (theRight.dealOps === 'fixed' && theRight.mark === 'up') {
                    fig = parseInt(theRight.figure);
                    return parseFloat(markupParams.amount) + parseFloat(fig);
                }
                else if (theRight.dealOps === 'fixed' && theRight.mark === 'down') {
                    fig = parseInt(theRight.figure);
                    return parseFloat(markupParams.amount) - parseFloat(fig);
                }
                else
                    return markupParams.amount;
            }
            else {
                return markupParams.amount;
            }
        }
        else {
            return markupParams.amount;
        }
    }
};

export default markupsLogic;