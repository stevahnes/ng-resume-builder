import jsPDF from 'jspdf';
import { POINT_TO_MM } from '../../../../constants';
import { FontStyle } from '../../../../utils';
import { Cursor } from '../../../../class';
import {
  A4Parameters,
  DEFAULT_LINE_HEIGHT,
  OnePageStandard,
  UNDEFINED_PERIOD_END
} from '../../constants/one-page-standard.constants';
import { SAMPLE_RESUME } from '../../constants/sample-resume.constants.spec';
import { startCase, upperCase } from 'lodash';
import { constructEducationContent } from './education.content.logic';

describe('education', () => {
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
    const setCursorXCoordinateSpy = spyOn(cursor, 'setXCoordinate').and.callThrough();
    const textSpy = spyOn(jsPDFInstance, 'text').and.callThrough();
    const incrementYCoordinateSpy = spyOn(cursor, 'incrementYCoordinate').and.callThrough();
    constructEducationContent(
      resume.education,
      jsPDFInstance,
      cursor,
      OnePageStandard,
      A4Parameters
    );
    expect(setCursorSizeSpy).toHaveBeenCalledOnceWith(OnePageStandard.TEXT_FONT_SIZE);
    expect(setCursorXCoordinateSpy).toHaveBeenCalledTimes(4 * resume.education.length);
    expect(setFontSpy).toHaveBeenCalledTimes(2 * resume.education.length);
    expect(setFontSizeSpy).toHaveBeenCalledTimes(2 * resume.education.length);
    expect(textSpy).toHaveBeenCalledTimes(4 * resume.education.length);
    expect(incrementYCoordinateSpy).toHaveBeenCalledTimes(2 * resume.education.length);
    for (let i = 0; i < resume.education.length; i++) {
      expect(setFontSizeSpy.calls.all()[i * 2].args[0]).toEqual(OnePageStandard.TEXT_FONT_SIZE);
      expect(setFontSizeSpy.calls.all()[i * 2 + 1].args[0]).toEqual(OnePageStandard.TEXT_FONT_SIZE);
      expect(setFontSpy.calls.all()[i * 2].args[1]).toEqual(FontStyle.BOLD);
      expect(setFontSpy.calls.all()[i * 2 + 1].args[1]).toEqual(FontStyle.REGULAR);
      expect(setCursorXCoordinateSpy.calls.all()[i * 4].args[0]).toEqual(OnePageStandard.MARGIN);
      expect(setCursorXCoordinateSpy.calls.all()[i * 4 + 1].args[0]).toEqual(
        A4Parameters.PORTRAIT_WIDTH - OnePageStandard.MARGIN
      );
      expect(setCursorXCoordinateSpy.calls.all()[i * 4 + 2].args[0]).toEqual(
        OnePageStandard.MARGIN
      );
      expect(setCursorXCoordinateSpy.calls.all()[i * 4 + 3].args[0]).toEqual(
        A4Parameters.PORTRAIT_WIDTH - OnePageStandard.MARGIN
      );
      expect(textSpy.calls.all()[i * 4].args[0]).toEqual(
        upperCase(resume.education[i].institution)
      );
      expect(textSpy.calls.all()[i * 4 + 1].args[0]).toEqual(
        `${startCase(resume.education[i].period.start)} – ${startCase(
          resume.education[i].period.end.length > 0
            ? resume.education[i].period.end
            : UNDEFINED_PERIOD_END
        )}`
      );
      expect(textSpy.calls.all()[i * 4 + 2].args[0]).toEqual(resume.education[i].qualification);
      if (resume.education[i].honorsAndGrade) {
        expect(textSpy.calls.all()[i * 4 + 3].args[0]).toEqual(
          resume.education[i].honorsAndGrade as string
        );
      }
      expect(textSpy.calls.all()[i * 4].args[3]).toEqual({ align: 'left', isInputVisual: true });
      expect(textSpy.calls.all()[i * 4 + 1].args[3]).toEqual({
        align: 'right',
        isInputVisual: true
      });
      expect(textSpy.calls.all()[i * 4 + 2].args[3]).toEqual({
        align: 'left',
        isInputVisual: true
      });
      expect(textSpy.calls.all()[i * 4 + 3].args[3]).toEqual({
        align: 'right',
        isInputVisual: true
      });
      expect(incrementYCoordinateSpy.calls.all()[i].args[0]).toEqual(
        DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM)
      );
      expect(incrementYCoordinateSpy.calls.all()[i + 1].args[0]).toEqual(
        resume.education[i].qualification.length *
          (DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM))
      );
    }
  });
});
