import feathersClient from '../../feathersClient';
const state = {
  airportList: null,
  bankAccount: null,
  sessionId: null,
  tokenId: null,
  initialDataSet: false,
  startLocation: null,
  endDestination: null,
  loadingModal: {
    isOpen: false,
    message: null
  },
  flightSearchResult: null,
  departDate: null,
  flightSearchParams: null,
  currentFlightSelection: null
};
const mutations = {
  updateAirportList(state, airportList) {
    state.airportList = airportList;
  },
  updateBankAccount(state, bankAccountList) {},
  updateSessionId(state, sessionId) {},
  updateTokenId(state, tokenId) {
    state.tokenId = tokenId;
  },
  updateLoadingModal(state, modalObj) {
    state.loadingModal = modalObj;
  },
  setValue(state, propertyName, toSet) {
    state[propertyName] = toSet
  }
};
const getters = {};
const actions = {
  doBooking() {
    $router.go('flightBooking')
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
