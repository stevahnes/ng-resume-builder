import jsPDF from 'jspdf';
import { POINT_TO_MM } from 'src/app/components/builder/constants';
import { Cursor } from '../../../../class';
import { FontStyle } from '../../../../utils';
import {
  A4Parameters,
  DEFAULT_LINE_HEIGHT,
  OnePageStandard
} from '../../constants/one-page-standard.constants';
import { constructSectionHeader } from './section.header.logic';

describe('SectionHeaderLogic', () => {
  it('should format each section headers correctly, complete with line', () => {
    const headerText = 'SAMPLE HEADER';
    const jsPDFInstance = new jsPDF(
      OnePageStandard.ORIENTATION,
      OnePageStandard.UNIT,
      OnePageStandard.FORMAT
    );
    const cursor = new Cursor(Math.random(), Math.random(), Math.random());
    const headerTextYCoordinate = cursor.getYCoordinate();
    spyOn(jsPDFInstance, 'setFont').and.callThrough();
    spyOn(jsPDFInstance, 'setFontSize').and.callThrough();
    spyOn(jsPDFInstance, 'text').and.callThrough();
    spyOn(jsPDFInstance, 'line').and.callThrough();
    spyOn(cursor, 'getYCoordinate').and.callThrough();
    spyOn(cursor, 'setXCoordinate').and.callThrough();
    spyOn(cursor, 'setYCoordinate').and.callThrough();
    spyOn(cursor, 'incrementYCoordinate').and.callThrough();
    spyOn(cursor, 'setSize').and.callThrough();
    constructSectionHeader(headerText, jsPDFInstance, cursor, OnePageStandard, A4Parameters);
    expect(cursor.setSize).toHaveBeenCalledOnceWith(OnePageStandard.SECTION_FONT_SIZE);
    expect(cursor.setXCoordinate).toHaveBeenCalledOnceWith(OnePageStandard.MARGIN);
    expect(jsPDFInstance.setFont).toHaveBeenCalledOnceWith(
      OnePageStandard.FONT_NAME,
      FontStyle.BOLD
    );
    expect(jsPDFInstance.setFontSize).toHaveBeenCalledOnceWith(cursor.getSize());
    expect(jsPDFInstance.text).toHaveBeenCalledOnceWith(
      headerText,
      cursor.getXCoordinate(),
      headerTextYCoordinate,
      { align: 'left', isInputVisual: true }
    );
    const headerLineYCoordinate =
      headerTextYCoordinate + ((DEFAULT_LINE_HEIGHT - 1) * cursor.getSize()) / 2;
    expect(jsPDFInstance.line).toHaveBeenCalledOnceWith(
      OnePageStandard.MARGIN,
      headerLineYCoordinate,
      A4Parameters.PORTRAIT_WIDTH - OnePageStandard.MARGIN,
      headerLineYCoordinate
    );
    expect(cursor.incrementYCoordinate).toHaveBeenCalledOnceWith(
      DEFAULT_LINE_HEIGHT * (cursor.getSize() * POINT_TO_MM)
    );
  });
});
