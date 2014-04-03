var select_slot_drag=false;
var slot_html = "";


function setup_slot_table(rows, slots, opt) {
    var mat={};
    for (i=0;i<rows.length;i++) {
        mat[rows[i]]=[];
        for(j=0;j<slots.length;j++) {
            mat[rows[i]][slots[j]]=1; /* default: all selected */
        }
    }

    restore_slot_table(mat, opt);
}

function restore_slot_table(slot_matrix, opt) {
    console.log(slot_matrix);
    var display_slot_name=opt["display_slot_name"];
    var display_slot_header=opt["display_slot_header"];
    var html ="<table id='select_table'>";

    //display header
    if (display_slot_header == true) {
        console.log("going in");
        html +="<tr class='c_slot_header'><td></td>";
        
        var k;
        for (key in slot_matrix) {
            k = key;
            break;
        }

        for(j in slot_matrix[k]) {
            html += "<td class='c_slot_header_item'>"+j+"</td>";
    
            //create a "clean" slot rows for appending method
            slot_html += "<td class='c_item' id='"+j+"'"+">"
                +"<div class='c_slot_item c_slot_selected'>";
            if (display_slot_name==true) {
                slot_html += j;
            } else {
                slot_html += "---";
            }
            slot_html += "</div>"+
                "</td>";
        }
        html +="</tr>";

    }

    //row
    for (i in slot_matrix) {
        var row_html="";
        row_html+="<tr class='c_channel_name_"+i+"'><td class='c_channel_name'>"+i+"</td>";
        //col
        for (j in slot_matrix[i]) {
            row_html+="<td class='c_item' id='"+j+"'>";

            if (slot_matrix[i][j]==1) {
                row_html += "<div class='c_slot_item c_slot_selected'>";
            } else {
                row_html += "<div class='c_slot_item'>";
            }
                
            if (display_slot_name==true) {
                row_html += j;
            } else {
                row_html += "---";
            }
                row_html += "</div>"+"</td>";
        }
        row_html+="</tr>";
        html += row_html;
    }
    html += "</table>";

    $("#id_slot").html(html);
}

function get_selected_slot(){
    res = {};
    $(".c_slot_selected").each(function () {
        s_id=$(this).parent().attr('id');
        pa = $( this ).parent().parent();        
        
        channel_c = pa.attr('class').split("_")[3];

        if (typeof res[channel_c] !== 'undefined') {
            res[channel_c].push(s_id);
        } else {
            res[channel_c] = [];
            res[channel_c].push(s_id);
        }

    });

    return res;
}

/* return mon:1,2,3~tue:1,2,4... */
function get_selected_slot_as_text() {
    var res = get_selected_slot();
    var s ="";
    for (i in res) {
       s+= i + ":" + res[i] + "~"; 
    }
    return s;
}

/* selected: mon:1,2,3~tue:2,3,1 */
function slot_select_text_to_matrix(rows, cols, selected) {
    if (rows == null) {
        rows=['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    }

    if (cols == null) {
        cols=['1','2','3','4','5','6','7','8','9','10', '11', '12', '13', '14','15','16','17','18','19','20','21','22','23','24'];
    }
    var day=selected.split("~");
  
    var mat={};
    for (i=0;i<rows.length;i++) {
      mat[rows[i]]=[];
      for(j=0;j<cols.length;j++) {
        mat[rows[i]][cols[j]]=0;
      }
    }

    //day
    var index="";
    for (i=0;i<day.length;i++) {
      //slot
      if (day[i] == "") { continue; }

      index=day[i].split(":")[0]
      var ds=day[i].split(":")[1]

      if (ds == "") { continue; }
      ds = ds.split(",");
      
      for (j=0;j<ds.length;j++) {
        if (ds[j]==""){ continue; }
        mat[index][ds[j]]=1;
      }
    }
    return mat;
}

/* return mon:1,2,3~tue:1,2,4... */
function slot_select_matrix_to_text(mat) {
    var s="";
    for (row in mat) {
        s+=row+":";
        for (col in mat[row]) {
            if (mat[row][col] == 1) {
                s+=col+",";
            } else if (mat[row][col] == -1) {
                s+="-"+col+",";
            }
        }
        s+="~";
    }

    return s;
}

/* 0: no change, 1: newly selected, -1: deselected */
function slot_select_get_matrix_diff(rows, cols, old_mat, new_mat) {
    if (rows == null) {
        rows=['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    }

    if (cols == null) {
        cols=['1','2','3','4','5','6','7','8','9','10', '11', '12', '13', '14','15','16','17','18','19','20','21','22','23','24'];
    }

    var diff_mat={};
    for (i=0;i<rows.length;i++) {
        diff_mat[rows[i]]=[];
        for(j=0;j<cols.length;j++) {
            diff_mat[rows[i]][cols[j]] = new_mat[rows[i]][cols[j]] - old_mat[rows[i]][cols[j]];
        }
    }
    return diff_mat;
}


function slot_select_clear() {
    $(".c_slot_item").removeClass("c_slot_selected");
}
function slot_select_select_all () {
    $(".c_slot_item").addClass("c_slot_selected");
}
function slot_select_add_row(row_name) {
    $h = "<tr class='c_channel_name_"+row_name+"'><td class='c_channel_name'>"+row_name+"</td>"+slot_html+"</tr>";
    $("#select_table").append($h);
}

$(document).ready(function() {

        $('body').on('mouseup','.c_slot_item',function() {
            select_slot_drag=false;
        });

        $('#id_slot').on('mouseover','.c_slot_item',function() {
            if (select_slot_drag == true) {
                $( this ).toggleClass( "c_slot_selected" );
            } else {
                return false;
            }
        });

        $('#id_slot').on('mousedown','.c_slot_item',function() {
            $( this ).toggleClass( "c_slot_selected" );
            select_slot_drag = true;
        });
    });
