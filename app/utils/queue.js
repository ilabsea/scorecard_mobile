import realm from '../db/schema';
import ScorecardService from '../services/scorecardService';
import environment from '../config/environment';

export default class Queue {
  static async initWorker() {
    let scorecards = realm.objects('Scorecard');
    scorecards = scorecards.filter(x => !!x.uploaded_date);

    for(let i=0; i<scorecards.length; i++) {
      let today = new Date();
      let uploadedDate = new Date(scorecards[i].uploaded_date);
      let differenceInTime = today.getTime() - uploadedDate.getTime();
      let differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays > environment.validDay) {
        const scorecardService = new ScorecardService();
        scorecardService.delete(scorecards[i].uuid);
      }
    }
  }
}
