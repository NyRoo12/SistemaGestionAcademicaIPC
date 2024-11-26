import PDFDocument from 'pdfkit'

export function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument()

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    doc.fontSize(30).text('Hello World')

    doc.end();

    // stream.on('finish', function() {
    //     iframe.src = stream.toBlobURL('application/pdf');
    // });

}
