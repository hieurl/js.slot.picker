js.slot.picker
==============

A javascript to create a slot select table

Check index.html for example
Main functions:
- setup_slot_table(rows, cols, {"display_slot_name": boolean, "display_slot_header": boolean});
    + rows: array of rows name. Eg: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    + cols: array of cols value. Eg ['a', 'b', 'c', 'd', 'e', 'f']
- restore_slot_table(mat, {"display_slot_name": boolean, "display_slot_header": boolean})
    + mat: a matrix with 0/1 value for each mapping [row][col]
        Eg: mat = { 'mon': ['a'=>0, 'b'=>1, 'c'=>0,... ], 'tue': ['a'=>1,...]}
- get_selected_slot()
    + return an array of selected slot: {'mon'=>['a','c','f'], 'tue'=> ['b','e'],...}
