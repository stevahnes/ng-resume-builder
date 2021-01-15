import jsPDF from 'jspdf';
import { Cursor } from '../../../class';
import { FormatParameters, Standard } from '../../../models';

export const A4Parameters: FormatParameters = {
  NAME: 'a4',
  PORTRAIT_WIDTH: 210,
  PORTRAIT_HEIGHT: 297
};

export const OnePageStandard: Standard = {
  ORIENTATION: 'portrait',
  UNIT: 'mm',
  FORMAT: A4Parameters.NAME,
  MARGIN: 12,
  FONT_NAME: 'Calibri',
  HEADER_FONT_SIZE: 14,
  SECTION_FONT_SIZE: 12,
  TEXT_FONT_SIZE: 10
};

export const onePagePDF = new jsPDF(
  OnePageStandard.ORIENTATION,
  OnePageStandard.UNIT,
  OnePageStandard.FORMAT
);

export const onePageCursor = new Cursor(0, 0, OnePageStandard.HEADER_FONT_SIZE);

export const SECTION_LINE_WIDTH = 0.5;

export const DEFAULT_LINE_HEIGHT = 1.15;

export const UNDEFINED_PERIOD_END = 'Present';

export const BULLETS = '• ';

export const BULLETS_WIDTH = 3;
