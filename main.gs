/**
 * Creates i18n translations based on given sheet
 *
 * @param {Sheet} sheet
 * @return {Object}
 */
function getTranslations(sheet) {
  const values = sheet.getDataRange().getDisplayValues(),
      languages = values[0].slice(1);
  
  let messages = {};
  languages.forEach((lang, langIdx) => {
    messages[lang] = {};
    
    values.forEach((row, rowIdx) => {
      if (rowIdx === 0) return;
      
      const key = row[0], value = row[langIdx + 1];
      if (!key) return;
      
      let it = messages[lang];
      key.split('.').forEach((prop, idx, list) => {
        if (idx !== list.length - 1) {
          if (!it.hasOwnProperty(prop))
            it[prop] = {};
          
          it = it[prop];
        }
        else {
          it[prop] = value;
        }
      });
    });
  });
  
  return messages;
}