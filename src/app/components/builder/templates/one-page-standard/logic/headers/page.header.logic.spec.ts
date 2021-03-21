import jsPDF from 'jspdf';
import { cloneDeep, upperCase } from 'lodash';
import { POINT_TO_MM } from '../../../../constants';
import { Cursor } from '../../../../class';
import {
  A4Parameters,
  DEFAULT_LINE_HEIGHT,
  OnePageStandard
} from '../../constants/one-page-standard.constants';
import { SAMPLE_RESUME } from '../../constants/sample-resume.constants.spec';
import { constructHeader } from './page.header.logic';

describe('PageHeader', () => {
  it('[FULL ENTRY] should format page header correctly, complete with line', () => {
    const resume = cloneDeep(SAMPLE_RESUME);
    const jsPDFInstance = new jsPDF(
      OnePageStandard.ORIENTATION,
      OnePageStandard.UNIT,
      OnePageStandard.FORMAT
    );
    const cursor = new Cursor(Math.random(), Math.random(), Math.random());
    spyOn(jsPDFInstance, 'setFont').and.callThrough();
    spyOn(jsPDFInstance, 'setFontSize').and.callThrough();
    const textSpy = spyOn(jsPDFInstance, 'text').and.callThrough();
    spyOn(cursor, 'setCoordinates').and.callThrough();
    const incrementYCoordinateSpy = spyOn(cursor, 'incrementYCoordinate').and.callThrough();
    const setSizeSpy = spyOn(cursor, 'setSize').and.callThrough();
    constructHeader(resume.header, jsPDFInstance, cursor, OnePageStandard, A4Parameters);
    expect(jsPDFInstance.setFontSize).toHaveBeenCalledTimes(3);
    expect(jsPDFInstance.setFont).toHaveBeenCalledTimes(3);
    expect(cursor.setCoordinates).toHaveBeenCalledOnceWith(
      A4Parameters.PORTRAIT_WIDTH / 2,
      OnePageStandard.MARGIN
    );
    expect(textSpy).toHaveBeenCalledTimes(3);
    expect(textSpy.calls.all()[0].args[0]).toEqual(upperCase(resume.header.name));
    expect(textSpy.calls.all()[1].args[0]).toEqual(resume.header.subtitle);
    expect(textSpy.calls.all()[2].args[0]).toEqual(
      `${resume.header.leftDetail} | ${resume.header.email} | ${resume.header.phone} | ${resume.header.rightDetail}`
    );
    for (const call of textSpy.calls.all()) {
      expect(call.args[3]).toEqual({ align: 'center', isInputVisual: true });
    }
    expect(setSizeSpy).toHaveBeenCalledTimes(2);
    expect(setSizeSpy.calls.all()[0].args[0]).toEqual(OnePageStandard.HEADER_FONT_SIZE);
    expect(setSizeSpy.calls.all()[1].args[0]).toEqual(OnePageStandard.TEXT_FONT_SIZE);
    expect(incrementYCoordinateSpy).toHaveBeenCalledTimes(3);
    expect(incrementYCoordinateSpy.calls.all()[0].args[0]).toEqual(
      DEFAULT_LINE_HEIGHT * (OnePageStandard.HEADER_FONT_SIZE * POINT_TO_MM)
    );
    expect(incrementYCoordinateSpy.calls.all()[1].args[0]).toEqual(
      DEFAULT_LINE_HEIGHT * (OnePageStandard.HEADER_FONT_SIZE * POINT_TO_MM)
    );
    expect(incrementYCoordinateSpy.calls.all()[2].args[0]).toEqual(
      DEFAULT_LINE_HEIGHT * (OnePageStandard.TEXT_FONT_SIZE * POINT_TO_MM)
    );
  });

  it('[WITHOUT OPTIONAL DETAILS] should format page header correctly, complete with line', () => {
    const resume = cloneDeep(SAMPLE_RESUME);
    resume.header.leftDetail = '';
    resume.header.rightDetail = '';
    const jsPDFInstance = new jsPDF(
      OnePageStandard.ORIENTATION,
      OnePageStandard.UNIT,
      OnePageStandard.FORMAT
    );
    const cursor = new Cursor(Math.random(), Math.random(), Math.random());
    spyOn(jsPDFInstance, 'setFont').and.callThrough();
    spyOn(jsPDFInstance, 'setFontSize').and.callThrough();
    const textSpy = spyOn(jsPDFInstance, 'text').and.callThrough();
    spyOn(cursor, 'setCoordinates').and.callThrough();
    const incrementYCoordinateSpy = spyOn(cursor, 'incrementYCoordinate').and.callThrough();
    const setSizeSpy = spyOn(cursor, 'setSize').and.callThrough();
    constructHeader(resume.header, jsPDFInstance, cursor, OnePageStandard, A4Parameters);
    expect(jsPDFInstance.setFontSize).toHaveBeenCalledTimes(3);
    expect(jsPDFInstance.setFont).toHaveBeenCalledTimes(3);
    expect(cursor.setCoordinates).toHaveBeenCalledOnceWith(
      A4Parameters.PORTRAIT_WIDTH / 2,
      OnePageStandard.MARGIN
    );
    expect(textSpy).toHaveBeenCalledTimes(3);
    expect(textSpy.calls.all()[0].args[0]).toEqual(upperCase(resume.header.name));
    expect(textSpy.calls.all()[1].args[0]).toEqual(resume.header.subtitle);
    expect(textSpy.calls.all()[2].args[0]).toEqual(
      `${resume.header.email} | ${resume.header.phone}`
    );
    for (const call of textSpy.calls.all()) {
      expect(call.args[3]).toEqual({ align: 'center', isInputVisual: true });
    }
    expect(setSizeSpy).toHaveBeenCalledTimes(2);
    expect(setSizeSpy.calls.all()[0].args[0]).toEqual(OnePageStandard.HEADER_FONT_SIZE);
    expect(setSizeSpy.calls.all()[1].args[0]).toEqual(OnePageStandard.TEXT_FONT_SIZE);
    expect(incrementYCoordinateSpy).toHaveBeenCalledTimes(3);
    expect(incrementYCoordinateSpy.calls.all()[0].args[0]).toEqual(
      DEFAULT_LINE_HEIGHT * (OnePageStandard.HEADER_FONT_SIZE * POINT_TO_MM)
    );
    expect(incrementYCoordinateSpy.calls.all()[1].args[0]).toEqual(
      DEFAULT_LINE_HEIGHT * (OnePageStandard.HEADER_FONT_SIZE * POINT_TO_MM)
    );
    expect(incrementYCoordinateSpy.calls.all()[2].args[0]).toEqual(
      DEFAULT_LINE_HEIGHT * (OnePageStandard.TEXT_FONT_SIZE * POINT_TO_MM)
    );
  });
});
