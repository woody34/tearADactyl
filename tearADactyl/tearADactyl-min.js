﻿function _cipher(c) { for (var a = [[0, 8203], [1, 8204], [2, 8205], [3, 8237], [4, 8290], [5, 8291], [6, 8292], [7, 8298], [8, 8299], [9, 8300], [10, 8301], [11, 8302], [12, 8303], [13, 8206], [14, 8207], [15, 8236]], f = "", b = 0; b < c.length; b++) { c.codePointAt(b); for (var d = ("000" + parseInt(c.codePointAt(b)).toString(16)).slice(-4).toString(16), e = 0; e < d.length; e++)for (var g in a) d.charAt(e) == a[g][0].toString(16) && (f += String.fromCodePoint(a[g][1])) } return f }
function _deCipher(c){var a=[[0,8203],[1,8204],[2,8205],[3,8237],[4,8290],[5,8291],[6,8292],[7,8298],[8,8299],[9,8300],[10,8301],[11,8302],[12,8303],[13,8206],[14,8207],[15,8236]];if(0!==c.length%4)return"Invalid cipher character length."+c.length;for(var f="",b=[],d=0;d<c.length;d++)for(var e in a)c.charCodeAt(d)==a[e][1]&&b.push(a[e][0]);for(a=0;a<c.length;a+=4)d=""+b[a].toString(16)+b[a+1].toString(16)+b[a+2].toString(16)+b[a+3].toString(16),f+=String.fromCodePoint(parseInt(d,16));return f}