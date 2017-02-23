import MarkupsModel from './models/markups_model';
import markupSeeds from './models/markupSeed';

module.exports = function seedMarkups () {
  MarkupsModel.run().then((markups) => {
    console.log(markups.length);
    if (!!markups && markups.length > 0) {
      return;
    }
    markupSeeds.forEach((markup) => {
      const newMarkup = new MarkupsModel(markup);
      newMarkup.save();
    });
  });
};
