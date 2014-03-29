var select_slot_drag=false;
var slot_html = "";


function setup_slot_table(row_list, slots, display_slot_name) {
    var html ="<table id='select_table'>";
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

    for (i=0;i<row_list.length;i++) {
        html += "<tr class='c_"+row_list[i]+"'><td class='c_channel_name'>"+row_list[i]+"</td>"+slot_html+"</tr>";
    }
    html +="</table>";

    $("#id_slot").html(html);
}

function get_selected_slot(){
    res = {};
    $(".c_slot_selected").each(function () {
        s_id=$(this).parent().attr('id');
        pa = $( this ).parent().parent();        
        
        channel_c = pa.attr('class').split("_")[1];

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
    $h = "<tr class='c_"+row_name+"'><td class='c_channel_name'>"+row_name+"</td>"+slot_html+"</tr>";
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
