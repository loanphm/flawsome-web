var xhr = new XMLHttpRequest();
xhr.open("GET", "member.xml", true);
var html = "";
var mem = document.getElementById("mem");
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var xmlDoc = xhr.responseXML;

        html = "<table border='1'>";
        var x = xmlDoc.getElementsByTagName("sinhvien");
        for (i = 0; i < x.length; i++) {
            html += "<tr>";
            html += "<td>" +
                x[i].getElementsByTagName("ten")[0].childNodes[0].nodeValue + "</td>";
            html += "<td>" +
                x[i].getElementsByTagName("mssv")[0].childNodes[0].nodeValue + "</td>";

            html += "</tr>";
        }
        html += "</table>";
    } else {
        html += "Không lấy được dữ liệu";
    }
    mem.innerHTML = html;
}
xhr.send();