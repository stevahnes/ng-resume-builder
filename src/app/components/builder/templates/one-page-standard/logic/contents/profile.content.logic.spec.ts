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
import { constructProfileContent } from './profile.content.logic';

describe('Profile', () => {
  it('should format profile content correctly', () => {
    const resume = { ...SAMPLE_RESUME };
    const jsPDFInstance = new jsPDF(
      OnePageStandard.ORIENTATION,
      OnePageStandard.UNIT,
      OnePageStandard.FORMAT
    );
    const cursor = new Cursor(Math.random(), Math.random(), Math.random());
    const profileTextYCoordinate = cursor.getYCoordinate();
    const expectedProfileTexts = [
      'Agile proactive Business Analyst and Full-Stack Engineer with 4+ years of experience in requirements and data analysis, solution',
      'refinement, and engineering of Software as a Service (SaaS) products. Successfully launched key product features, innovative',
      'pilots, and provided production support to global clients. Certified ScrumMaster, Product Owner, Agile Facilitator, and Agile',
      'Coach who is also proficient in modern software development stack, popular issue tracking tool, and industry-standard UI design',
      'application. Fluent in English, Bahasa Indonesia, Malay, and basic conversational Chinese.'
    ];
    spyOn(cursor, 'setSize').and.callThrough();
    spyOn(jsPDFInstance, 'setFont').and.callThrough();
    spyOn(jsPDFInstance, 'setFontSize').and.callThrough();
    spyOn(jsPDFInstance, 'splitTextToSize').and.callThrough();
    spyOn(cursor, 'setXCoordinate').and.callThrough();
    spyOn(jsPDFInstance, 'text').and.callThrough();
    spyOn(cursor, 'incrementYCoordinate').and.callThrough();
    constructProfileContent(resume.profile, jsPDFInstance, cursor, OnePageStandard, A4Parameters);
    expect(jsPDFInstance.setFontSize).toHaveBeenCalledOnceWith(OnePageStandard.TEXT_FONT_SIZE);
    expect(jsPDFInstance.setFont).toHaveBeenCalledOnceWith(
      OnePageStandard.FONT_NAME,
      FontStyle.REGULAR
    );
    expect(jsPDFInstance.splitTextToSize).toHaveBeenCalledOnceWith(
      resume.profile,
      A4Parameters.PORTRAIT_WIDTH - 2 * OnePageStandard.MARGIN
    );
    expect(cursor.setXCoordinate).toHaveBeenCalledOnceWith(OnePageStandard.MARGIN);
    expect(jsPDFInstance.text).toHaveBeenCalledOnceWith(
      expectedProfileTexts,
      cursor.getXCoordinate(),
      profileTextYCoordinate,
      { align: 'left', isInputVisual: true }
    );
    expect(cursor.incrementYCoordinate).toHaveBeenCalledOnceWith(
      expectedProfileTexts.length * (DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM))
    );
  });
});
