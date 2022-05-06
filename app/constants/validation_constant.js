const validationConstant = {
  email: {
    presence: {
      message: '^emailRequireMsg',
    },
    email: {
      message: '^emailIsInvalidMsg',
    },
  },
  password: {
    presence: {
      message: '^passwordRequireMsg',
    },
  },
  scorecardCode: {
    presence: {
      message: '^scorecardCodeRequireMsg',
    },
    numericality: true,
    length: {
      is: 6,
    },
  },
  facilitatorLead: {
    presence: {
      message: '^facilitatorLeadRequireMsg',
    },
  },
  otherFacilitator: {
    presence: {
      message: '^otherFacilitatorRequireMsg',
    },
  },
  participant: {
    presence: {
      message: '^allParticipateRequireMsg',
    },
    numericality: {
      greaterThan: 0,
    },
  },
  age: {
    presence: {
      message: '^ageRequireMsg',
    },
    numericality: {
      greaterThan: 0,
    },
  },
  indicatorName: {
    presence: {
      message: '^indicatorNameRequireMsg',
    }
  },
  endpointLabel: {
    presence: {
      message: '^serverLabelRequireMsg',
    }
  },
  enpointValue: {
    presence: {
      message: '^serverUrlRequireMsg',
    }
  }
};

export default validationConstant;
