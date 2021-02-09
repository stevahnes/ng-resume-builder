import jsPDF from 'jspdf';
import { Cursor } from '../class';
import { POINT_TO_MM } from '../constants';
import {
  A4Parameters,
  OnePageStandard,
  SECTION_LINE_WIDTH
} from '../templates/one-page-standard/constants/one-page-standard.constants';
import {
  addLineSpace,
  drawPageWidthLine,
  enterAndCheckMargin,
  FontStyle,
  splitTextToSize,
  updateFontAndSize,
  writeCenter,
  writeLeft,
  writeRight
} from './jspdf-wrapper.utils';

describe('jsPDFWrapper', () => {
  describe('splitTextToSize', () => {
    it('should call the jsPDF function correctly', () => {
      const pdfInstance = new jsPDF(
        OnePageStandard.ORIENTATION,
        OnePageStandard.UNIT,
        OnePageStandard.FORMAT
      );
      const text = 'SAMPLE TEXT';
      const maxWidth = 40;
      spyOn(pdfInstance, 'splitTextToSize');
      splitTextToSize(pdfInstance, text, maxWidth);
      expect(pdfInstance.splitTextToSize).toHaveBeenCalledOnceWith(text, maxWidth);
    });
  });
  describe('writeLeft', () => {
    it('should call the jsPDF function correctly', () => {
      const pdfInstance = new jsPDF(
        OnePageStandard.ORIENTATION,
        OnePageStandard.UNIT,
        OnePageStandard.FORMAT
      );
      const cursor = new Cursor(Math.random(), Math.random(), Math.random());
      const text = 'SAMPLE TEXT';
      spyOn(pdfInstance, 'text');
      writeLeft(pdfInstance, text, cursor);
      expect(pdfInstance.text).toHaveBeenCalledOnceWith(
        text,
        cursor.getXCoordinate(),
        cursor.getYCoordinate(),
        { align: 'left' }
      );
    });
  });
  describe('writeCenter', () => {
    it('should call the jsPDF function correctly', () => {
      const pdfInstance = new jsPDF(
        OnePageStandard.ORIENTATION,
        OnePageStandard.UNIT,
        OnePageStandard.FORMAT
      );
      const cursor = new Cursor(Math.random(), Math.random(), Math.random());
      const text = 'SAMPLE TEXT';
      spyOn(pdfInstance, 'text');
      writeCenter(pdfInstance, text, cursor);
      expect(pdfInstance.text).toHaveBeenCalledOnceWith(
        text,
        cursor.getXCoordinate(),
        cursor.getYCoordinate(),
        { align: 'center' }
      );
    });
  });
  describe('writeRight', () => {
    it('should call the jsPDF function correctly', () => {
      const pdfInstance = new jsPDF(
        OnePageStandard.ORIENTATION,
        OnePageStandard.UNIT,
        OnePageStandard.FORMAT
      );
      const cursor = new Cursor(Math.random(), Math.random(), Math.random());
      const text = 'SAMPLE TEXT';
      spyOn(pdfInstance, 'text');
      writeRight(pdfInstance, text, cursor);
      expect(pdfInstance.text).toHaveBeenCalledOnceWith(
        text,
        cursor.getXCoordinate(),
        cursor.getYCoordinate(),
        { align: 'right' }
      );
    });
  });
  describe('updateFontAndSize', () => {
    it('should call the jsPDF function correctly', () => {
      const pdfInstance = new jsPDF(
        OnePageStandard.ORIENTATION,
        OnePageStandard.UNIT,
        OnePageStandard.FORMAT
      );
      const fontName = 'SAMPLE FONT';
      const fontStyle = FontStyle.REGULAR;
      const fontSize = Math.random();
      spyOn(pdfInstance, 'setFont');
      spyOn(pdfInstance, 'setFontSize');
      updateFontAndSize(pdfInstance, fontName, fontStyle, fontSize);
      expect(pdfInstance.setFont).toHaveBeenCalledOnceWith(fontName, fontStyle);
      expect(pdfInstance.setFontSize).toHaveBeenCalledOnceWith(fontSize);
    });
  });
  describe('drawPageWidthLine', () => {
    it('should call the jsPDF function correctly for portrait orientation', () => {
      const pdfInstance = new jsPDF('portrait', OnePageStandard.UNIT, OnePageStandard.FORMAT);
      const yCoordinate = Math.random();
      spyOn(pdfInstance, 'line');
      drawPageWidthLine(
        pdfInstance,
        OnePageStandard,
        A4Parameters,
        yCoordinate,
        SECTION_LINE_WIDTH
      );
      expect(pdfInstance.line).toHaveBeenCalledOnceWith(
        OnePageStandard.MARGIN,
        yCoordinate,
        A4Parameters.PORTRAIT_WIDTH - OnePageStandard.MARGIN,
        yCoordinate
      );
    });
    it('should call the jsPDF function correctly for landscape orientation', () => {
      const pdfInstance = new jsPDF('landscape', OnePageStandard.UNIT, OnePageStandard.FORMAT);
      const landscapeStandard = { ...OnePageStandard };
      landscapeStandard.ORIENTATION = 'landscape';
      const yCoordinate = Math.random();
      spyOn(pdfInstance, 'line');
      drawPageWidthLine(
        pdfInstance,
        landscapeStandard,
        A4Parameters,
        yCoordinate,
        SECTION_LINE_WIDTH
      );
      expect(pdfInstance.line).toHaveBeenCalledOnceWith(
        OnePageStandard.MARGIN,
        yCoordinate,
        A4Parameters.PORTRAIT_HEIGHT - OnePageStandard.MARGIN,
        yCoordinate
      );
    });
  });
  describe('updateFontAndSize', () => {
    it('should call the jsPDF function correctly', () => {
      const pdfInstance = new jsPDF(
        OnePageStandard.ORIENTATION,
        OnePageStandard.UNIT,
        OnePageStandard.FORMAT
      );
      const fontName = 'SAMPLE FONT';
      const fontStyle = FontStyle.REGULAR;
      const fontSize = Math.random();
      spyOn(pdfInstance, 'setFont');
      spyOn(pdfInstance, 'setFontSize');
      updateFontAndSize(pdfInstance, fontName, fontStyle, fontSize);
      expect(pdfInstance.setFont).toHaveBeenCalledOnceWith(fontName, fontStyle);
      expect(pdfInstance.setFontSize).toHaveBeenCalledOnceWith(fontSize);
    });
  });
  describe('enterAndCheckMargin', () => {
    it('should enter to new line by the amount specified', () => {
      const pdfInstance = new jsPDF('portrait', OnePageStandard.UNIT, OnePageStandard.FORMAT);
      const cursor = new Cursor(
        Math.round(Math.random() * 10),
        Math.round(Math.random() * 10),
        Math.round(Math.random() * 10)
      );
      const lineHeight = Math.round(Math.random() * 10);
      const times = Math.round(Math.random() * 10);
      const incrementYCoordinateSpy = spyOn(cursor, 'incrementYCoordinate').and.callThrough();
      enterAndCheckMargin(pdfInstance, cursor, OnePageStandard, A4Parameters, lineHeight, times);
      expect(incrementYCoordinateSpy.calls.first().args[0]).toBeCloseTo(
        times * lineHeight * (cursor.getSize() * POINT_TO_MM),
        5
      );
    });
  });
  describe('addLineSpace', () => {
    it('should add page if cursor exceeds margin for portrait orientation', () => {
      const pdfInstance = new jsPDF('portrait', OnePageStandard.UNIT, OnePageStandard.FORMAT);
      const cursor = new Cursor(100, 280, 30);
      const lineHeight = 1.5;
      spyOn(cursor, 'incrementYCoordinate').and.callThrough();
      spyOn(pdfInstance, 'addPage').and.callThrough();
      addLineSpace(pdfInstance, cursor, OnePageStandard, A4Parameters, lineHeight);
      expect(cursor.incrementYCoordinate).toHaveBeenCalledOnceWith(
        lineHeight * (cursor.getSize() * POINT_TO_MM)
      );
      expect(pdfInstance.addPage).toHaveBeenCalledOnceWith(
        A4Parameters.NAME,
        OnePageStandard.ORIENTATION
      );
      expect(cursor.getYCoordinate()).toEqual(OnePageStandard.MARGIN);
      expect(pdfInstance.getNumberOfPages()).toEqual(2);
    });
    it('should add page if cursor exceeds margin for landscape orientation', () => {
      const pdfInstance = new jsPDF('portrait', OnePageStandard.UNIT, OnePageStandard.FORMAT);
      const landscapeStandard = { ...OnePageStandard };
      landscapeStandard.ORIENTATION = 'landscape';
      const cursor = new Cursor(100, 200, 30);
      const lineHeight = 1.5;
      spyOn(cursor, 'incrementYCoordinate').and.callThrough();
      spyOn(pdfInstance, 'addPage').and.callThrough();
      addLineSpace(pdfInstance, cursor, landscapeStandard, A4Parameters, lineHeight);
      expect(cursor.incrementYCoordinate).toHaveBeenCalledOnceWith(
        lineHeight * (cursor.getSize() * POINT_TO_MM)
      );
      expect(pdfInstance.addPage).toHaveBeenCalledOnceWith(
        A4Parameters.NAME,
        landscapeStandard.ORIENTATION
      );
      expect(cursor.getYCoordinate()).toEqual(landscapeStandard.MARGIN);
      expect(pdfInstance.getNumberOfPages()).toEqual(2);
    });
  });
});
