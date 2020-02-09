# GAS-i18n

Convert Google Sheet to i18n

```javascript
function getTranslations(sheet) {
	const values = sheet.getDataRange().getDisplayValues(),
		languages = values[0].slice(1);

	let messages = {};
	languages.forEach((lang, langIdx) => {
		messages[lang] = {};

		values.forEach((row, rowIdx) => {
			if (rowIdx === 0) return;

			const key = row[0],
				value = row[langIdx + 1];
			if (!key) return;

			let it = messages[lang];
			key.split('.').forEach((prop, idx, list) => {
				if (idx !== list.length - 1) {
					if (!it.hasOwnProperty(prop)) it[prop] = {};

					it = it[prop];
				} else {
					it[prop] = value;
				}
			});
		});
	});

	return messages;
}
```

![Google Sheet](/img/sheet.PNG)

```javascript
function buildTranslations() {
	const spreadsheet = SpreadsheetApp.openById(
			'1aNH-NGNhCgt4Mb_Tjc2qLacKT3t-KTCoNd_25TjFK-0'
		),
		sheet = spreadsheet.getActiveSheet();

	const messages = getTranslations(sheet);

	/*
	const jsonStr = JSON.stringify(messages, null, 2);
	DriveApp.createFile('messages.json', jsonStr); // create new file on Google Drive
	DriveApp.getFileById('google-drive-file-id').setContent(jsonStr); // update file
	*/
}

/*
messages = { 
    en: {
      $vuetify: {
        close: 'Close',
        dataIterator: {
          pageText: '{0}-{1} of {2}'
        },
        noDataText: 'No data available'
      }
    },
    
    pl: {
      $vuetify: {
        close: 'Zamknij',
        dataIterator: {
          pageText: '{0}-{1} of {2}'
        },
        noDataText: 'Brak danych'
      }
    }
  };
*/
```
