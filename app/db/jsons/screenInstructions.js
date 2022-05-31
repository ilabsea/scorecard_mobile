export default [
  {
    screenName: "OfflineParticipantList",
    title: "ព័ត៌មានអ្នកចូលរួម",
    notes: [
      "សូមបញ្ចូលទិន្នន័យរបស់អ្នកចូលរួមនីមួយៗ ហើយយកលេខរៀងដែលទទួលបានពីកម្មវិធី មកសរសេរលើស្ទីកគ័រ ហើយបិទលើស្មារជូនពួកគាត់",
    ],
    navigateTo: "Participant",
    header: {
      title: "getStarted",
      type: "ProgressHeader",
      progressIndex: 2
    }
  },
  {
    screenName: "OfflineRaisingProposed",
    title: "ការបំផុសលក្ខណៈវិនិច្ឆ័យ",
    notes: [
      "ដំណាក់កាលនេះគឺតម្រូវអោយ CAF អនុវត្តការពិភាក្សាលើលក្ខណៈវិនិច្ឆ័យជាមួយអ្នកចូលរួមតាមធម្មតា",
      "នៅពេលចប់ការពិភាក្សាជាមួយអ្នកចូលរួមលើលក្ខណៈវិនិច្ឆ័យ -> CAF ត្រូវបញ្ចូលលក្ខណៈវិនិច្ឆ័យទាំងអស់ចូលក្នុងកម្មវិធីដោយភ្ជាប់ជាមួយលេខកូដរបស់អ្នកចូលរួម",
    ],
    navigateTo: "ProposedIndicator",
    header: {
      title: "getStarted",
      type: "ProgressHeader",
      progressIndex: 3
    }
  },
  {
    screenName: "OfflineIndicatorDevelopment",
    title: "ការជ្រើសរើសលក្ខណៈវិនិច្ឆ័យអាទិភាព",
    notes: [
      "បន្ទាប់ពីធ្វើការបញ្ចូលលក្ខណៈវិនិច្ឆ័យចូលក្នុងកម្មវិធីអស់ហើយ CAF ធ្វើការពិភាក្សាជាមួយអ្នកចូលរួមដើម្បីកំណត់ លក្ខណៈវិនិច្ឆ័យអាទិភាពដូចធម្មតា"
    ],
    navigateTo: "IndicatorDevelopment",
    header: {
      title: "setIndicatorDevelopment",
      type: "HorizontalProgressHeader",
      progressIndex: 2
    }
  },
  {
    screenName: "OfflineScorecardResult",
    title: "តារាងសកម្មភាពអាទិភាព",
    notes: [
      "ដំណាក់កាលនេះតម្រូវអោយ CAF ពិភាក្សារកសកម្មភាពអាទិភាពដូចធម្មតា ហើយ CAF គ្រាន់តែបញ្ចូលទិន្នន័យពេលដែលធ្វើការពិភាក្សារួចជាការស្រេច",
    ],
    navigateTo: "ScorecardResult",
    header: {
      title: "scorecardResult",
      type: "HorizontalProgressHeader",
      progressIndex: 4
    }
  },
]
