 $(function() {
     rowsTo = columnsTo = 5;
     rowsFrom = columnsFrom = 0;
     TableCreater(rowsFrom, rowsTo, columnsFrom, columnsTo);
     $("#rowSlider").slider({
         range: true,
         min: -15,
         max: 15,
         values: [0, 5],
         slide: function(event, ui) {
             var total = ui.values[1] - ui.values[0];
             if (total > 30 || total < 0) {
                 return false;
             }
             rowsFrom = ui.values[0];
             rowsTo = ui.values[1]; // global call
             $("#rowAmount").val(ui.values[0] + " to " + ui.values[1]);
             TableCreater(rowsFrom, rowsTo, columnsFrom, columnsTo);
         }
     });
     $("#rowAmount").val(" " + $("#rowSlider").slider("values", 0) + " to " + $("#rowSlider").slider("values", 1));
     $("#columnSlider").slider({
         range: true,
         min: -15,
         max: 15,
         values: [0, 5],
         slide: function(event, ui) {
             var total = ui.values[1] - ui.values[0];
             if (total > 30 || total < 0) {
                 return false;
             }
             columnsFrom = ui.values[0];
             columnsTo = ui.values[1];
             $("#columnAmount").val(ui.values[0] + " to " + ui.values[1]);
             TableCreater(rowsFrom, rowsTo, columnsFrom, columnsTo);
         }
     });
     $("#columnAmount").val(" " + $("#columnSlider").slider("values", 0) + " to " + $("#columnSlider").slider("values", 1));
 });