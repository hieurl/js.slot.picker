var select_slot_drag=false;
var slot_html = "";


function setup_slot_table(row_list, slots, opt) {
    var display_slot_name=opt["display_slot_name"];
    var display_slot_header=opt["display_slot_header"];
    var html ="<table id='select_table'>";

    //setup slot header
    if (display_slot_header == true) {
        html +="<tr class='c_slot_header'><td></td>";
        
        for(j in slots) {
            html += "<td class='c_slot_header_item'>"+slots[j]+"</td>";
        }
        html +="</tr>";
    }

    //rows
    for (j=0;j<slots.length;j++) {
        slot_html += "<td class='c_item' id='"+slots[j]+"'"+">"
            +"<div class='c_slot_item c_slot_selected'>";
        if (display_slot_name==true) {
            slot_html += slots[j];
        } else {
            slot_html += "---";
        }
        slot_html += "</div>"+
            "</td>";
    }

    //rows for each channel
    for (i=0;i<row_list.length;i++) {
        html += "<tr class='c_channel_name_"+row_list[i]+"'><td class='c_channel_name_item'>"+row_list[i]+"</td>"+slot_html+"</tr>";
    }
    html +="</table>";

    $("#id_slot").html(html);
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
