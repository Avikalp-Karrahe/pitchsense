import { Document, Packer, Paragraph, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

export function exportToDocx(email: string, onePager: { title: string; text: string }[]) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: "Email Preview", heading: HeadingLevel.HEADING_1 }),
          new Paragraph(email),
          new Paragraph(""),
          new Paragraph({ text: "One-Pager Preview", heading: HeadingLevel.HEADING_1 }),
          ...onePager.flatMap(section => [
            new Paragraph({ text: section.title, heading: HeadingLevel.HEADING_2 }),
            new Paragraph(section.text),
            new Paragraph(""),
          ])
        ]
      }
    ]
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, "pitch_preview.docx");
  });
}
