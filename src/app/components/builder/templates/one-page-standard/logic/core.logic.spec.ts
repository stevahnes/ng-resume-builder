import jsPDF from 'jspdf';
import { Cursor } from '../../../class';
import { OnePageStandard } from '../constants/one-page-standard.constants';
import { SAMPLE_RESUME } from '../constants/sample-resume.constants.spec';
import { generateOnePageStandardPDF } from './core.logic';

const resume = SAMPLE_RESUME;

describe('CoreLogic', () => {
  it('should call through the jsPDF functions and continuously update cursor', () => {
    const jsPDFInstance = new jsPDF(
      OnePageStandard.ORIENTATION,
      OnePageStandard.UNIT,
      OnePageStandard.FORMAT
    );
    const cursor = new Cursor(Math.random(), Math.random(), Math.random());
    spyOn(jsPDFInstance, 'output');
    spyOn(jsPDFInstance, 'addFileToVFS').and.callThrough();
    spyOn(jsPDFInstance, 'addFont').and.callThrough();
    spyOn(jsPDFInstance, 'setFont').and.callThrough();
    spyOn(jsPDFInstance, 'setFontSize').and.callThrough();
    spyOn(jsPDFInstance, 'splitTextToSize').and.callThrough();
    spyOn(jsPDFInstance, 'text').and.callThrough();
    spyOn(jsPDFInstance, 'line').and.callThrough();
    spyOn(cursor, 'getXCoordinate').and.callThrough();
    spyOn(cursor, 'getYCoordinate').and.callThrough();
    spyOn(cursor, 'setXCoordinate').and.callThrough();
    spyOn(cursor, 'setYCoordinate').and.callThrough();
    spyOn(cursor, 'setCoordinates').and.callThrough();
    spyOn(cursor, 'incrementYCoordinate').and.callThrough();
    spyOn(cursor, 'getSize').and.callThrough();
    spyOn(cursor, 'setSize').and.callThrough();
    generateOnePageStandardPDF(resume, jsPDFInstance, cursor);
    expect(jsPDFInstance.addFileToVFS).toHaveBeenCalledTimes(2);
    expect(jsPDFInstance.addFont).toHaveBeenCalledTimes(2);
    expect(jsPDFInstance.setFont).toHaveBeenCalled();
    expect(jsPDFInstance.setFontSize).toHaveBeenCalled();
    expect(jsPDFInstance.splitTextToSize).toHaveBeenCalled();
    expect(jsPDFInstance.text).toHaveBeenCalled();
    expect(jsPDFInstance.line).toHaveBeenCalled();
    expect(jsPDFInstance.output as any).toHaveBeenCalledWith('dataurlnewwindow');
    expect(cursor.getXCoordinate).toHaveBeenCalled();
    expect(cursor.getYCoordinate).toHaveBeenCalled();
    expect(cursor.setXCoordinate).toHaveBeenCalled();
    expect(cursor.setYCoordinate).toHaveBeenCalled();
    expect(cursor.setCoordinates).toHaveBeenCalled();
    expect(cursor.incrementYCoordinate).toHaveBeenCalled();
    expect(cursor.getSize).toHaveBeenCalled();
    expect(cursor.setSize).toHaveBeenCalled();
  });
});
