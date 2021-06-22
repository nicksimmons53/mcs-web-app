import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import _ from 'lodash';
import { 
    advInfoColumnNames, 
    cabinetInfoRows, 
    carpetInfoRows, 
    countertopInfoRows, 
    fullColumn,
    levelTotalColumn,
    descTotalColumn,
    descUnitTotalColumn,
    tileInfoRows, 
    woodInfoRows, 
    levelUnitTotalColumn,
    typeTotalColumn,
    typeColorTotalColumn
} from '../../../static_data';
import { formatAddress, formatTinyInt } from 'helpers/dataFormatter';

const chars =
    ['A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'];

const numberToExcelHeader = (index) => {
    index -= 1;

    const quotient = Math.floor(index / 26);
    if (quotient > 0) {
        return numberToExcelHeader(quotient) + chars[index % 26];
    }

    return chars[index % 26];
};

const formatBasicInfo = (worksheet, data) => {
    let addresses = [
        [ "Corporate", data.addrs1, data.addrs2, data.ctynme, data.state_, data.zipcde ],
        [ "Billing", data.bilad1, data.bilad2, data.bilcty, data.bilste, data.bilzip],
        [ "Shipping", data.shpad1, data.shpad2, data.shpcty, data.shpste, data.shpzip ]
    ];

    let contacts = data.contacts.map(contact => {
        return _.slice(_.values(contact), 2);
    });

    worksheet.addRow(["Sales Person", "Document Created at"]);
    worksheet.addRow([`${data.fstnme} ${data.lstnme}`, `${Date( )}`]);

    worksheet.addTable({
        name: 'Addresses',
        displayName: 'Addresses',
        headerRow: true,
        ref: 'A5',
        style: { theme: 'TableStyleMedium2', showRowStripes: true },
        columns: [
            { name: 'Type' },
            { name: 'Address 1' },
            { name: 'Address 2' },
            { name: 'City' },
            { name: 'State' },
            { name: 'Zip' }
        ],
        rows: addresses
    });

    worksheet.addTable({
        name: 'Contacts',
        displayName: 'Contacts',
        headerRow: true,
        ref: 'A10',
        style: { theme: 'TableStyleMedium2', showRowStripes: true },
        columns: [
            { name: 'Name' },
            { name: 'Title' },
            { name: 'Phone' },
            { name: 'Email' },
        ],
        rows: contacts
    });

    worksheet.properties.defaultColWidth = 35;
    worksheet.properties.defaultRowHeight = 20;
    worksheet.eachRow((row, index) => {
        worksheet.getRow(index).font = { size: 14 };
    });

    worksheet.getRow(1).font = { size: 16, bold: true, underline: true };
    worksheet.getRow(2).font = { size: 14, bold: true };
    worksheet.getRow(5).alignment = { horizontal: 'center' };
    worksheet.getRow(10).alignment = { horizontal: 'center' };

    worksheet.getCell('A1').alignment = { horizontal: 'center' };
}

const formatAdvInfo = (worksheet, data) => {
    worksheet.addRow(["Sales Person", "Document Created at"]);
    worksheet.addRow([`${data.fstnme} ${data.lstnme}`, `${Date( )}`]);
    data = data[0];
    let address = formatAddress([data.invoice_addr, data.invoice_city, data.invoice_state, data.invoice_zip]);
    data = formatTinyInt(data);
    let advInfo = [ [advInfoColumnNames[0], data.payment_freq], [advInfoColumnNames[1], data.autopay],
        [advInfoColumnNames[2], data.invoice_submit], [advInfoColumnNames[3], data.invoice_email],
        [advInfoColumnNames[4], address], [advInfoColumnNames[5], address], [advInfoColumnNames[6], data.payment_type],
        [advInfoColumnNames[7], data.payment_portal], [advInfoColumnNames[8], data.payment_url],
        [advInfoColumnNames[9], data.po_required], [advInfoColumnNames[10], data.invoice_req_pos],
        [advInfoColumnNames[11], data.approvals_req], [advInfoColumnNames[12], data.acc_cont_name],
        [advInfoColumnNames[13], data.acc_cont_phn], [advInfoColumnNames[14], data.acc_cont_ema],
        [advInfoColumnNames[15], data.vendor_portal], [advInfoColumnNames[16], data.vnd_portal_user],
        [advInfoColumnNames[17], data.vnd_portal_pswd], [advInfoColumnNames[18], data.job_release],
        [advInfoColumnNames[19], data.job_email], [advInfoColumnNames[20], data.po_handling],
        [advInfoColumnNames[21], data.po_hndl_email], [advInfoColumnNames[22], data.exp_start_date],
        [advInfoColumnNames[23], data.est_num_homes]
    ];

    worksheet.addTable({
        name: 'AdvancedInfo',
        displayName: 'AdvancedInfo',
        headerRow: true,
        ref: 'A4',
        style: { theme: 'TableStyleMedium2', showRowStripes: true },
        columns: [
            { name: 'Question' },
            { name: 'Response' }
        ],
        rows: advInfo
    });
    worksheet.properties.defaultColWidth = 40;
    worksheet.properties.defaultRowHeight = 20;
    worksheet.eachRow((row, index) => {
        worksheet.getRow(index).font = { size: 14 };
    });

    worksheet.getRow(1).font = { size: 16, bold: true, underline: true };
    worksheet.getRow(2).font = { size: 14, bold: true };

    worksheet.getCell('A1').alignment = { horizontal: 'center' };
}

const formatProgramInfo = (worksheet, data) => {
    let programs = ["TileInfo", "WoodInfo", "CarpetInfo", "CountertopsInfo", "CabinetInfo"];
    let questions = [ tileInfoRows, woodInfoRows, carpetInfoRows, countertopInfoRows, cabinetInfoRows ];
    let refs = ["A5", "A46", "A59", "A68", "A82"];
    let wrapRefs = ["B42", "B54", "B63", "B78"];

    worksheet.addRow(["Sales Person", "Document Created at"]);
    worksheet.addRow([`${data.fstnme} ${data.lstnme}`, `${Date( )}`]);

    delete data.fstnme;
    delete data.lstnme;
    
    _.values(data).forEach((info, index) => {
        if (info === null || typeof(info) === undefined) 
            return;
            
        let formattedInfo = [];
        let newObj = formatTinyInt(info);

        delete newObj.id;
        delete newObj.client_id;
        _.toPairs(questions[index]).forEach((question, index) => {
            formattedInfo.push([ question[1], _.values(newObj)[index] ]);
        });

        worksheet.addTable({
            name: programs[index],
            headerRow: true,
            ref: refs[index],
            style: { theme: 'TableStyleMedium2', showRowStripes: true },
            columns: [
                { name: 'Question' },
                { name: 'Response' }
            ],
            rows: formattedInfo
        });
    });

    worksheet.getCell("A4").value = "Tile";
    worksheet.getCell("A4").font = { size: 16, bold: true };
    worksheet.getCell("A45").value = "Wood";
    worksheet.getCell("A45").font = { size: 16, bold: true };
    worksheet.getCell("A58").value = "Carpet";
    worksheet.getCell("A58").font = { size: 16, bold: true };
    worksheet.getCell("A67").value = "Countertops";
    worksheet.getCell("A67").font = { size: 16, bold: true };
    worksheet.getCell("A81").value = "Cabinets";
    worksheet.getCell("A81").font = { size: 16, bold: true };

    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.properties.defaultColWidth = 60;
    worksheet.properties.defaultRowHeight = 20;
    worksheet.eachRow((row, index) => {
        worksheet.getRow(index).font = { size: 14 };
    });
    
    wrapRefs.map((cell) => worksheet.getCell(cell).alignment = { wrapText: true } );

    worksheet.getRow(1).font = { size: 16, bold: true, underline: true };
    worksheet.getRow(2).font = { size: 14, bold: true };
}

const formatBillingPartsInfo = ((worksheet, data) => {
    const columns = {
        'Floor Tile': fullColumn, 
        'Bathroom Wall Tile': fullColumn, 
        'Backsplash Wall Tile': fullColumn, 
        'Fireplace Wall Tile': fullColumn, 
        'Floor Stone': fullColumn, 
        'Bathroom Wall Stone': fullColumn,
        'Backsplash Wall Stone': fullColumn, 
        'Fireplace Wall Stone': fullColumn, 
        'Shower Pans - Stone': levelTotalColumn, 
        'Shower Pans - Tile': levelTotalColumn, 
        'Shower Pans - Deco': levelTotalColumn,
        'Underlayment': descTotalColumn, 
        'Pattern Charges': descTotalColumn, 
        'Accents': descTotalColumn, 
        'Shower Seats': descUnitTotalColumn,
        'Add-Ons': descUnitTotalColumn,
        'Wood Flooring': fullColumn,
        'Carpet Flooring': fullColumn,
        'Carpet Pad': levelUnitTotalColumn,
        'Vinyl Plank': fullColumn,
        'Vinyl Sheet': fullColumn,
        'Edges': typeTotalColumn,
        'Sinks/Shapes': descTotalColumn,
        'Level 1': typeColorTotalColumn,
        'Level 2': typeColorTotalColumn,
        'Level 3': typeColorTotalColumn,
        'Level 4': typeColorTotalColumn,
        'Level 5': typeColorTotalColumn,
        'Level 6': typeColorTotalColumn,
        'Level 7': typeColorTotalColumn,
        'Level 8': typeColorTotalColumn,
        'Level 9': typeColorTotalColumn,
        'Level 10': typeColorTotalColumn
    };

    worksheet.addRow(["Sales Person", "Document Created at"]);
    worksheet.addRow([`${data.fstnme} ${data.lstnme}`, `${Date( )}`]);
    delete data.fstnme;
    delete data.lstnme;
    
    let x = 0;
    _.values(data).forEach((program, index) => {
        let rowRefs = [5, 30, 55, 80, 105];

        if (program.length === 0) 
            return;

        const tables = program.reduce((acc, x) => {
            acc[x.programTable] = [...(acc[x.programTable] || []), x];
            
            return acc;
        }, {});

        let i = 0;
        let rowRef = rowRefs[x];
        _.mapKeys(tables, (table, name) => {
            let columnRef;

            let tableColumns = [];
            let tableRows = [];
            if (_.hasIn(columns, name)) {
                columns[name].map((column) => tableColumns.push({ name: column.headerName }));

                table.forEach((row, index) => {
                    let fieldsNeeded = [];
                    columns[name].forEach((column) => {
                        if (_.hasIn(row, column.field)) {
                            fieldsNeeded.push(column.field);
                        }
                    });

                    let tempArr = [];
                    fieldsNeeded.forEach((field, index) => {
                        tempArr.push(row[field]);
                    });
                    
                    tableRows.push(tempArr);
                });
            }

            if (tableColumns.length === 0 || tableRows.length === 0) {
                return;
            }

            columnRef = numberToExcelHeader(i + 1);
            worksheet.getCell(columnRef + rowRef.toString()).value = name;
            worksheet.getCell(columnRef + rowRef.toString()).font = { size: 14, bold: true };
            worksheet.addTable({
                name: name,
                headerRow: true,
                ref: columnRef + (rowRef+1).toString( ),
                style: { theme: 'TableStyleMedium2', showRowStripes: true },
                columns: tableColumns,
                rows: tableRows
            });

            i += tableColumns.length + 2;
        });

        x += 1;
    });

    worksheet.properties.defaultColWidth = 20;
    worksheet.properties.defaultRowHeight = 20;
    worksheet.eachRow((row, index) => {
        worksheet.getRow(index).font = { size: 14 };
    });

    worksheet.getRow(1).font = { size: 16, bold: true, underline: true };
    worksheet.getRow(2).font = { size: 14, bold: true };
});

const retrieveFiles = (data, clientName) => {
    const s3_url = process.env.REACT_APP_S3_URL;

    if (data.file.Contents.length === 0)
        return [];

    let files = [];
    data.file.Contents.forEach((file, index) => {
        files.push({
            url: `${s3_url}${file.Key}`, 
            name: file.Key.split('/')[1] 
        }); 
    });

    return files;
}

export const createFile = (worksheets, fileName) => {
    let workbook = new Workbook( );
    let clientName = fileName;
    let files = [];
    
    // Workbook Properties
    workbook.created = new Date( );

    Object.keys(worksheets).forEach((sheet, index) => {
        if (worksheets[sheet] === null) {
            return;
        }

        let title = worksheets[sheet].title;
        let data = worksheets[sheet].data;
        let ws = workbook.addWorksheet(worksheets[sheet].title);

        switch (title) {
            case "Basic Info":
                formatBasicInfo(ws, data);
                break;

            case "Advanced Info":
                formatAdvInfo(ws, data);
                break;
            
            case "Programs":
                formatProgramInfo(ws, data);
                break;

            case "Billing Parts":
                formatBillingPartsInfo(ws, data);
                break;
            
            case "Files":
                workbook.removeWorksheet("Files");
                files = retrieveFiles(data, clientName);
                break;
        
            default:
                break;
        }
    });

    workbook.eachSheet(async (worksheet) => await worksheet.protect( ));

    workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fileName);
    });

    // Save Client Attachments
    files.forEach((file) => fs.saveAs(file.url, file.name))
};