var base_url = "http://muslimsalat.com/yogyakarta/";

$(document).ready(function(){
    
    load_jadwal_harian();
	load_jadwal_bulanan();
	load_info_lainnya();
    $('#harian-btn').bind('tap', function(){
        console.log('harian diklik...');
        load_jadwal_harian();
    });
    
    $('#bulanan-btn').bind('tap', function(){
        console.log('bulanan diklik...');
		load_jadwal_bulanan();
    });
    
    $('#info-lainnya-btn').bind('tap', function(){
        console.log('info lainnya diklik...');
        load_info_lainnya();
    });
});
function load_jadwal_bulanan()
{
setTimeout(function(){
            var results = $.getJSON(base_url+'monthly.json').success(function(){
                json_data = results.responseJSON.items;
                
                // load daftar hari di bulan tertentu
                var elem = "";
                $('#daftar-tanggal').html('');
                for (var i = 0; i < json_data.length; i++)
                {
                    var item = json_data[i];
                    elem = '<a id="jadwal_shalat_'+i+'" data-jadwal="'+item.date_for+'" href="index.html" class="btn btn-default btn-block btn-social btn-bitbucket"><i class="fa fa-arrow-circle-right"></i>'+item.date_for+'</a>';
                    $('#daftar-tanggal').append(elem);
                }
                
                // memasang event lihat jadwal pada daftar hari di bulan tertentu
                for (var i = 0; i < json_data.length; i++)
                {
                    var item = json_data[i];
                    $('#jadwal_shalat_'+i.toString()).bind('tap', function(){
                        console.log('jadwal shalat diklik...');
                        load_jadwal(this);
                    });
                }
                
                elem = null;
            });
        }, 1000);
}
function load_info_lainnya()
{
	var raw_date = new Date();
        var month = raw_date.getMonth()+1;
        var today_date = raw_date.getUTCFullYear()+'-'+month+'-'+raw_date.getUTCDate();
        var results = $.getJSON(base_url+today_date+'/daily.json').success(function(){
            $('#other-info-temperature').html(results.responseJSON.today_weather.temperature + " derajat celsius");
            $('#other-info-pressure').html(results.responseJSON.today_weather.pressure + " cmHg");
            $('#other-info-qibla').html(results.responseJSON.qibla_direction + " derajat dari utara");
            $('#other-info-location').html( results.responseJSON.query + ", " + results.responseJSON.state + ", " + results.responseJSON.country);
            $('#other-info-prayer-method-name').html(results.responseJSON.prayer_method_name);
        });
}
function load_jadwal_harian()
{
    var raw_date = new Date();
    var month = raw_date.getMonth()+1;
    var today_date = raw_date.getUTCFullYear()+'-'+month+'-'+raw_date.getUTCDate();
    setTimeout(function(){
        var results = $.getJSON(base_url+today_date+'/daily.json').success(function(){
            var imsak_time = moment(today_date + " " + results.responseJSON.items[0].fajr).subtract(10, 'minutes').format('H:m');
            
            $('#main-imsak').html(imsak_time + " am");
            $('#main-subuh').html(results.responseJSON.items[0].fajr);
            $('#main-syuruk').html(results.responseJSON.items[0].shurooq);
            $('#main-dzuhur').html(results.responseJSON.items[0].dhuhr);
            $('#main-ashar').html(results.responseJSON.items[0].asr);
            $('#main-magrib').html(results.responseJSON.items[0].maghrib);
            $('#main-isya').html(results.responseJSON.items[0].isha);
			
        });
    }, 1000);
}

function load_jadwal(elem)
{
    var req_date = $(elem).attr('data-jadwal');
    setTimeout(function(){
        $.afui.setTitle(req_date);
        var results = $.getJSON(base_url+req_date+'/daily.json').success(function(){
            
            var imsak_time = moment(req_date + " " + results.responseJSON.items[0].fajr).subtract(10, 'minutes').format('H:m');
            $('#monthly-imsak').html(imsak_time + " am");
            $('#monthly-subuh').html(results.responseJSON.items[0].fajr);
            $('#monthly-syuruk').html(results.responseJSON.items[0].shurooq);
            $('#monthly-dzuhur').html(results.responseJSON.items[0].dhuhr);
            $('#monthly-ashar').html(results.responseJSON.items[0].asr);
            $('#monthly-maghrib').html(results.responseJSON.items[0].maghrib);
            $('#monthly-isya').html(results.responseJSON.items[0].isha);
			$('#tgl-skrg').html(req_date);
        });
    }, 1000);
}