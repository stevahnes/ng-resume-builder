import jsPDF from 'jspdf';
import { POINT_TO_MM } from '../../../../constants';
import { FontStyle } from '../../../../utils';
import { Cursor } from '../../../../class';
import {
  A4Parameters,
  BULLETS,
  BULLETS_WIDTH,
  DEFAULT_LINE_HEIGHT,
  OnePageStandard,
  UNDEFINED_PERIOD_END
} from '../../constants/one-page-standard.constants';
import { SAMPLE_RESUME } from '../../constants/sample-resume.constants.spec';
import { startCase, toUpper, trimEnd, upperFirst } from 'lodash';
import { constructWorkExperienceContent } from './work-experience.content.logic';

describe('Work', () => {
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
    constructWorkExperienceContent(
      resume.work,
      jsPDFInstance,
      cursor,
      OnePageStandard,
      A4Parameters
    );
    let setCursorXPointer = 0;
    let textPointer = 0;
    let incrementYPointer = 0;
    for (let i = 0; i < resume.work.length; i++) {
      expect(setFontSizeSpy.calls.all()[i * 2].args[0]).toEqual(OnePageStandard.TEXT_FONT_SIZE);
      expect(setFontSizeSpy.calls.all()[i * 2 + 1].args[0]).toEqual(OnePageStandard.TEXT_FONT_SIZE);
      expect(setFontSpy.calls.all()[i * 2].args[1]).toEqual(FontStyle.BOLD);
      expect(setFontSpy.calls.all()[i * 2 + 1].args[1]).toEqual(FontStyle.REGULAR);
      expect(setCursorXCoordinateSpy.calls.all()[setCursorXPointer].args[0]).toEqual(
        OnePageStandard.MARGIN
      );
      expect(setCursorXCoordinateSpy.calls.all()[setCursorXPointer + 1].args[0]).toEqual(
        A4Parameters.PORTRAIT_WIDTH - OnePageStandard.MARGIN
      );
      expect(textSpy.calls.all()[textPointer].args[0]).toEqual(toUpper(resume.work[i].company));
      expect(textSpy.calls.all()[textPointer + 1].args[0]).toEqual(resume.work[i].location);
      expect(incrementYCoordinateSpy.calls.all()[incrementYPointer].args[0]).toEqual(
        DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM)
      );
      setCursorXPointer += 2;
      textPointer += 2;
      incrementYPointer++;
      for (let j = 0; j < resume.work[i].designations.length; j++) {
        expect(setCursorXCoordinateSpy.calls.all()[setCursorXPointer + j * 2].args[0]).toEqual(
          OnePageStandard.MARGIN
        );
        expect(setCursorXCoordinateSpy.calls.all()[setCursorXPointer + j * 2 + 1].args[0]).toEqual(
          A4Parameters.PORTRAIT_WIDTH - OnePageStandard.MARGIN
        );
        expect(textSpy.calls.all()[textPointer + j * 2].args[0]).toEqual(
          resume.work[i].designations[j]
        );
        expect(textSpy.calls.all()[textPointer + j * 2 + 1].args[0]).toEqual(
          `${startCase(resume.work[i].periods[j].start)} – ${startCase(
            resume.work[i].periods[j].end.length > 0
              ? resume.work[i].periods[j].end
              : UNDEFINED_PERIOD_END
          )}`
        );
        expect(textSpy.calls.all()[textPointer + j * 2].args[3]).toEqual({
          align: 'left',
          isInputVisual: true
        });
        expect(textSpy.calls.all()[textPointer + j * 2 + 1].args[3]).toEqual({
          align: 'right',
          isInputVisual: true
        });
        expect(incrementYCoordinateSpy.calls.all()[incrementYPointer + j].args[0]).toEqual(
          DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM)
        );
      }
      setCursorXPointer += 2 * resume.work[i].designations.length;
      textPointer += 2 * resume.work[i].designations.length;
      incrementYPointer += resume.work[i].designations.length;
      for (let k = 0; k < resume.work[i].descriptions.length; k++) {
        expect(setCursorXCoordinateSpy.calls.all()[setCursorXPointer + k * 2].args[0]).toEqual(
          OnePageStandard.MARGIN
        );
        expect(setCursorXCoordinateSpy.calls.all()[setCursorXPointer + k * 2 + 1].args[0]).toEqual(
          OnePageStandard.MARGIN + BULLETS_WIDTH
        );
        const descriptionTexts: string[] = jsPDFInstance.splitTextToSize(
          `${trimEnd(upperFirst(resume.work[i].descriptions[k]), '.')}.`,
          A4Parameters.PORTRAIT_WIDTH - 2 * OnePageStandard.MARGIN - BULLETS_WIDTH
        );
        expect(textSpy.calls.all()[textPointer + k * 2].args[0]).toEqual(BULLETS);
        expect(textSpy.calls.all()[textPointer + k * 2 + 1].args[0]).toEqual(descriptionTexts);
        expect(textSpy.calls.all()[textPointer + k * 2].args[3]).toEqual({
          align: 'left',
          isInputVisual: true
        });
        expect(textSpy.calls.all()[textPointer + k * 2 + 1].args[3]).toEqual({
          align: 'left',
          isInputVisual: true
        });
        expect(incrementYCoordinateSpy.calls.all()[incrementYPointer + k].args[0]).toEqual(
          descriptionTexts.length * (DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM))
        );
      }
      setCursorXPointer += 2 * resume.work[i].descriptions.length;
      textPointer += 2 * resume.work[i].descriptions.length;
      incrementYPointer += resume.work[i].descriptions.length;
      if (i < resume.work.length - 1) {
        expect(incrementYCoordinateSpy.calls.all()[incrementYPointer].args[0]).toEqual(
          DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM)
        );
        incrementYPointer++;
      }
    }
    expect(setCursorSizeSpy).toHaveBeenCalledOnceWith(OnePageStandard.TEXT_FONT_SIZE);
    expect(setFontSpy).toHaveBeenCalledTimes(2 * resume.work.length);
    expect(setFontSizeSpy).toHaveBeenCalledTimes(2 * resume.work.length);
    expect(setCursorXCoordinateSpy).toHaveBeenCalledTimes(setCursorXPointer);
    expect(textSpy).toHaveBeenCalledTimes(textPointer);
    expect(incrementYCoordinateSpy).toHaveBeenCalledTimes(incrementYPointer);
  });
});
