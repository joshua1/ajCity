import _ from "lodash";

const helpers = {
  currencyList: [
    {
      label: 'Prices in Naira',
      value: 'NGN'
    },
    {
      label: 'Prices in USD',
      value: 'USD'
    }

  ],
  ticketClassList: [
    {
      label: 'Economy Class',
      value: 'Y'
    },
    {
      label: 'First Class',
      value: 'F'
    },
    {
      label: 'Business Class',
      value: 'C'
    }
  ],
  PassengerTypes: [
    {
      typeName: 'Adult',
      typeCode: 'ADT'
    },
    {
      typeName: 'Child',
      typeCode: 'C11'
    },
    {
      typeName: 'Infant',
      typeCode: 'INF'
    }
  ],
  findCity(airportList, cityCode) {
    let cityObj = _.find(airportList, function(ap) {
      return ap.text.includes(cityCode);
    });
    console.log(JSON.stringify(cityObj));
    if (cityObj)
      return cityObj.text.replace('(' + cityCode + '),', '');
    else
      return '';
  },
  fullDate(vl) {
    let returnDate = Date.create(vl);
    let dMonth = parseInt(returnDate.getMonth()) + 1;
    let monthString = dMonth.toString().length > 1 ? dMonth : `0${dMonth}`;
    let dDay = parseInt(returnDate.getDate());
    let dayString = dDay.toString().length > 1 ? dDay : `0${dDay}`;
    let returnValue = returnDate.getFullYear() + '-' + monthString + '-' + dayString + 'T00:00:00';
    console.log(returnValue);
    return returnValue;
  },
  findPassengerType(passCode) {
    let passObj = _.find(this.PassengerTypes, function(pt) {
      return pt.typeCode.include(passCode);
    });
    return passObj.typeName;
  },
  naira: '₦',
  dollars: '$',
  countries: [
    {
      label: 'Nigeria',
      value: 'Nigeria'
    },
    {
      label: 'United Kingdom',
      value: 'United Kingdom'
    },
    {
      label: 'United States',
      value: 'United States'
    },
    {
      label: 'Ghana',
      value: 'Ghana'
    },
    {
      label: 'South Africa',
      value: 'South Africa'
    }
  ],
  passengerTitle: [
    {
      label: 'Mr.',
      value: 'Mr'
    },
    {
      label: 'Mrs.',
      value: 'Mrs'
    },
    {
      label: 'Miss',
      value: 'Miss'
    },
    {
      label: 'Ms',
      value: 'Ms'
    },
    {
      label: 'prof',
      value: 'Prof'
    },
    {
      label: 'Barr',
      value: 'Barr'
    },
    {
      label: 'Chief',
      value: 'Chief'
    },
    {
      label: 'Dr',
      value: 'Dr'
    },
    {
      label: 'Lady',
      value: 'Lady'
    },
    {
      label: 'Sir',
      value: 'Sir'
    },
    {
      label: 'Rev.',
      value: 'Rev'
    },
    {
      label: 'Sen.',
      value: 'Sen'
    },
    {
      label: 'Pastor',
      value: 'Pastor'
    }
  ],
  isValidEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  },
  isDobValid(dob) {
    return dob.isBefore(Date.now());
  },
  termsAndConditions() {
    return 'Terms and Conditions';
  },
  createTransactionRef(pnr) {
    let day = Date.create('today');
    let dTime = day.getTime();
    return pnr + dTime.toString().substring(0, 6);
  },
  switchFeePercent: 1.5,
  amountToPay(amount) {
    return amount + (amount * ((this.switchFeePercent / 100)));
  },
  globalPost(path, params, method) {
    method = method || "post";
    let form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  },
  merchantId: 5556,
  merchantuid: 'qt_ws_user',
  merchantpwd: 'qt_ws_password',
  globalPayUrl: 'https://demo.globalpay.com.ng/GlobalpayWebService_demo/service.asmx', //https://www.eazypaynigeria.com/globalpay_demo/';
  createTransactionReference() {},
    datepickrOptions:{
                    altFormat: 'F j, Y',
                    altInput: true,
                },
};

export default helpers;
