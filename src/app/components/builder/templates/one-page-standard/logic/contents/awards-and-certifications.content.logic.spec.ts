import jsPDF from 'jspdf';
import { POINT_TO_MM } from '../../../../constants';
import { FontStyle } from '../../../../utils';
import { Cursor } from '../../../../class';
import {
  A4Parameters,
  AWARDS_AND_CERTS_DATE_WIDTH,
  BULLETS,
  BULLETS_WIDTH,
  DEFAULT_LINE_HEIGHT,
  OnePageStandard
} from '../../constants/one-page-standard.constants';
import { SAMPLE_RESUME } from '../../constants/sample-resume.constants.spec';
import { constructAwardsAndCertificationsContent } from './awards-and-certifications.content.logic';
import { trimEnd, upperFirst } from 'lodash';

describe('AwardsAndCertifications', () => {
  it('should format awards and certifications content correctly', () => {
    const resume = { ...SAMPLE_RESUME };
    const jsPDFInstance = new jsPDF(
      OnePageStandard.ORIENTATION,
      OnePageStandard.UNIT,
      OnePageStandard.FORMAT
    );
    const cursor = new Cursor(Math.random(), Math.random(), Math.random());
    const setCursorSizeSpy = spyOn(cursor, 'setSize').and.callThrough();
    const setFontSpy = spyOn(jsPDFInstance, 'setFont').and.callThrough();
    const setFontSizeSpy = spyOn(jsPDFInstance, 'setFontSize').and.callThrough();
    const splitTextToSizeSpy = spyOn(jsPDFInstance, 'splitTextToSize').and.callThrough();
    const setCursorXCoordinateSpy = spyOn(cursor, 'setXCoordinate').and.callThrough();
    const textSpy = spyOn(jsPDFInstance, 'text').and.callThrough();
    const incrementYCoordinateSpy = spyOn(cursor, 'incrementYCoordinate').and.callThrough();
    constructAwardsAndCertificationsContent(
      resume.awardsAndCertifications,
      jsPDFInstance,
      cursor,
      OnePageStandard,
      A4Parameters
    );
    expect(setCursorSizeSpy).toHaveBeenCalledOnceWith(OnePageStandard.TEXT_FONT_SIZE);
    expect(setCursorXCoordinateSpy).toHaveBeenCalledTimes(
      3 * resume.awardsAndCertifications.length
    );
    expect(setFontSpy).toHaveBeenCalledTimes(2 * resume.awardsAndCertifications.length);
    expect(setFontSizeSpy).toHaveBeenCalledTimes(2 * resume.awardsAndCertifications.length);
    expect(splitTextToSizeSpy).toHaveBeenCalledTimes(resume.awardsAndCertifications.length);
    expect(textSpy).toHaveBeenCalledTimes(3 * resume.awardsAndCertifications.length);
    expect(incrementYCoordinateSpy).toHaveBeenCalledTimes(
      resume.awardsAndCertifications.length - 1
    );
    for (let i = 0; i < resume.awardsAndCertifications.length; i++) {
      expect(setFontSizeSpy.calls.all()[i * 2].args[0]).toEqual(OnePageStandard.TEXT_FONT_SIZE);
      expect(setFontSizeSpy.calls.all()[i * 2 + 1].args[0]).toEqual(OnePageStandard.TEXT_FONT_SIZE);
      expect(setFontSpy.calls.all()[i * 2].args[1]).toEqual(FontStyle.REGULAR);
      expect(setFontSpy.calls.all()[i * 2 + 1].args[1]).toEqual(FontStyle.BOLD);
      expect(setCursorXCoordinateSpy.calls.all()[i * 3].args[0]).toEqual(OnePageStandard.MARGIN);
      expect(setCursorXCoordinateSpy.calls.all()[i * 3 + 1].args[0]).toEqual(
        OnePageStandard.MARGIN + BULLETS_WIDTH
      );
      expect(setCursorXCoordinateSpy.calls.all()[i * 3 + 2].args[0]).toEqual(
        A4Parameters.PORTRAIT_WIDTH - OnePageStandard.MARGIN
      );
      expect(splitTextToSizeSpy.calls.all()[i].args[0]).toEqual(
        trimEnd(upperFirst(resume.awardsAndCertifications[i].name), '.')
      );
      expect(splitTextToSizeSpy.calls.all()[i].args[1]).toEqual(
        A4Parameters.PORTRAIT_WIDTH -
          2 * OnePageStandard.MARGIN -
          BULLETS_WIDTH -
          AWARDS_AND_CERTS_DATE_WIDTH
      );
      expect(textSpy.calls.all()[i * 3].args[0]).toEqual(BULLETS);
      expect(textSpy.calls.all()[i * 3 + 1].args[0]).toEqual([
        resume.awardsAndCertifications[i].name
      ]);
      expect(textSpy.calls.all()[i * 3 + 2].args[0]).toEqual(
        resume.awardsAndCertifications[i].acquiredDate
      );
      expect(textSpy.calls.all()[i * 3].args[3]).toEqual({ align: 'left', isInputVisual: true });
      expect(textSpy.calls.all()[i * 3 + 1].args[3]).toEqual({
        align: 'left',
        isInputVisual: true
      });
      expect(textSpy.calls.all()[i * 3 + 2].args[3]).toEqual({
        align: 'right',
        isInputVisual: true
      });
      expect(incrementYCoordinateSpy).toHaveBeenCalledWith(
        DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM)
      );
    }
  });
});
