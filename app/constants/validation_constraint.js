const validationConstraint = {
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
};

export default validationConstraint;
