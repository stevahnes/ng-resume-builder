import jsPDF from 'jspdf';
import { POINT_TO_MM } from '../../../../constants';
import { FontStyle } from '../../../../utils';
import { Cursor } from '../../../../class';
import {
  A4Parameters,
  DEFAULT_LINE_HEIGHT,
  OnePageStandard
} from '../../constants/one-page-standard.constants';
import { SAMPLE_RESUME } from '../../constants/sample-resume.constants.spec';
import { constructCoreCompetenciesContent } from './core-competencies.content.logic';

describe('CoreCompetencies', () => {
  it('should format core competencies content correctly', () => {
    const resume = { ...SAMPLE_RESUME };
    const jsPDFInstance = new jsPDF(
      OnePageStandard.ORIENTATION,
      OnePageStandard.UNIT,
      OnePageStandard.FORMAT
    );
    const cursor = new Cursor(Math.random(), Math.random(), Math.random());
    const competenciesTextYCoordinate = cursor.getYCoordinate();
    const expectedCompetenciesTexts = [
      'AngularJS • JavaScript • Typescript • SQL • Python • Java • Jasmine • HTML • CSS • Git • npm • MATLAB • Postman • Figma',
      'Agile • Scrum • Product backlog management • Design thinking • Project management • JIRA • Confluence • ScriptRunner'
    ];
    spyOn(cursor, 'setSize').and.callThrough();
    spyOn(jsPDFInstance, 'setFont').and.callThrough();
    spyOn(jsPDFInstance, 'setFontSize').and.callThrough();
    spyOn(jsPDFInstance, 'splitTextToSize').and.callThrough();
    spyOn(cursor, 'setXCoordinate').and.callThrough();
    spyOn(jsPDFInstance, 'text').and.callThrough();
    spyOn(cursor, 'incrementYCoordinate').and.callThrough();
    constructCoreCompetenciesContent(
      resume.competencies,
      jsPDFInstance,
      cursor,
      OnePageStandard,
      A4Parameters
    );
    expect(jsPDFInstance.setFontSize).toHaveBeenCalledOnceWith(OnePageStandard.TEXT_FONT_SIZE);
    expect(jsPDFInstance.setFont).toHaveBeenCalledOnceWith(
      OnePageStandard.FONT_NAME,
      FontStyle.REGULAR
    );
    expect(jsPDFInstance.splitTextToSize).toHaveBeenCalledOnceWith(
      resume.competencies.join(' • '),
      A4Parameters.PORTRAIT_WIDTH - 2 * OnePageStandard.MARGIN
    );
    expect(cursor.setXCoordinate).toHaveBeenCalledOnceWith(A4Parameters.PORTRAIT_WIDTH / 2);
    expect(jsPDFInstance.text).toHaveBeenCalledOnceWith(
      expectedCompetenciesTexts,
      cursor.getXCoordinate(),
      competenciesTextYCoordinate,
      { align: 'center', isInputVisual: true }
    );
    expect(cursor.incrementYCoordinate).toHaveBeenCalledOnceWith(
      expectedCompetenciesTexts.length * (DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM))
    );
  });
});
