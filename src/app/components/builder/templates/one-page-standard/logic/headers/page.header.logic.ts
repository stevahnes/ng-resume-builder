import jsPDF from 'jspdf';
import { upperCase } from 'lodash';
import { FormatParameters, Header, Standard } from '../../../../models';
import { Cursor } from '../../../../class';
import { enterAndCheckMargin, FontStyle, updateFontAndSize, writeCenter } from '../../../../utils';
import { DEFAULT_LINE_HEIGHT } from '../../constants/one-page-standard.constants';

export function constructHeader(
  header: Header,
  jsPDFInstance: jsPDF,
  cursor: Cursor,
  standard: Standard,
  pageParameters: FormatParameters
): void {
  /** Construct Title */
  updateFontAndSize(jsPDFInstance, standard.FONT_NAME, FontStyle.BOLD, cursor.getSize());
  cursor.setCoordinates(pageParameters.PORTRAIT_WIDTH / 2, standard.MARGIN);
  writeCenter(jsPDFInstance, upperCase(header.name), cursor);
  enterAndCheckMargin(jsPDFInstance, cursor, standard, pageParameters, DEFAULT_LINE_HEIGHT, 1);

  /** Construct Subtitle */
  updateFontAndSize(jsPDFInstance, standard.FONT_NAME, FontStyle.REGULAR, cursor.getSize());
  writeCenter(jsPDFInstance, header.subtitle, cursor);
  enterAndCheckMargin(jsPDFInstance, cursor, standard, pageParameters, DEFAULT_LINE_HEIGHT, 1);

  /** Construct Additional Details */
  cursor.setSize(standard.TEXT_FONT_SIZE);
  updateFontAndSize(jsPDFInstance, standard.FONT_NAME, FontStyle.REGULAR, cursor.getSize());
  const contactInformation = `${header.leftDetail} | ${header.email} | ${header.phone} | ${header.rightDetail}`;
  writeCenter(jsPDFInstance, contactInformation, cursor);
  enterAndCheckMargin(jsPDFInstance, cursor, standard, pageParameters, DEFAULT_LINE_HEIGHT, 1);
}
