const validationConstant = {
  backendUrl: {
    presence: {
      message: '^backendUrlRequireMsg',
    },
  },
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
  allParticipate: {
    presence: {
      message: '^allParticipateRequireMsg',
    },
  },
};

export default validationConstant;
