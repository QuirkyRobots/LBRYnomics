/*
* © 2022 LBRYnomics. All rights reserved. Duplication or mimicking this code is strictly prohibited.
*/

jQuery(document).ready(function($) {
	/*
	$.ajax({
      url:'http://139.99.236.66:5000/status',
      type:'HEAD',
      error: function()
      {
        console.log("It's not there")
      },
      success: function()
      {
        console.log("The file is there")
      }
	});
	*/
    
    // Protect Images a little

    $('svg-image-url').prop('draggable', false);
	$('img').bind('contextmenu', function(e) {return false;});
  	$('img').mousedown(function(e) {return false;})    
    $('.mfp-img').bind('contextmenu', function(e) {return false;});   
    $("img").click(function(event){
	if(event.button==2){
	return false;}}); 
    

    //YouTube Sync
    
    function fetchSyncData() {
      $.ajax({
        type: 'post',
        dataType: "json",
        url: 'https://api.lbry.com/yt/queue_status',
        success: function(data) {

          const NewPendingData = `${data.data.NewPending}`
          $(".yts-pending").html(NewPendingData)
          
          const pendingUpdateData = `${data.data.PendingUpdate}`
          $(".yts-pending-update").html(pendingUpdateData)
          
          const pendingUpgradeData = `${data.data.PendingUpgrade}`
          $(".yts-pending-upgrade").html(pendingUpgradeData)
          
          const failedData = `${data.data.Failed}`
          $(".yts-failed").html(failedData)
          
          const statusData = `${data.data.GeneralStatus}`
          $(".yts-status").html(statusData)
          $('.yts-status:contains("considerate")').addClass('warning-c')
          $('.yts-status:contains("heavily")').addClass('warning-h')
  		},
          error: function() {
            $('.yts-status').addClass('warning-h')
            $('.yts-status').html("Not Connecting to LBRY Inc API");
              
            $(".yts-pending").html("?")
            $(".yts-pending-update").html("?")
            $(".yts-pending-upgrade").html("?")
            $(".yts-failed").html("?")
          }  
    });
  }
    
  $(document).ready(function() {
  	setInterval(fetchSyncData, 300000);
  	fetchSyncData();
  	$.ajaxSetup({ cache: false });

  }); 
  
    // Table builder

    $.getJSON('../data/top_2000.json', function(data) {
      var humanTimeSub = `${data.human_time_utc}`
      $(".human-time-sub").html(humanTimeSub)
      $(".human-time-sub").attr('title', humanTimeSub)

      var sub_data = '';
      $.each(data.ranks, function(i, rank) {

        // Rank

        sub_data += '<tr class="ln-row" data-top500="'
            + data.top_500[i]
            + '" data-rank="'
            + data.ranks[i]
            + '" data-new="'
            + data.new_type[i]
            + '" lbrychannels="'
            + data.vanity_names[i].toLowerCase()
            + '"><td class="rank">'
            + rank
            + '</td>';

        // URL Bulider

			// Thumbnails
          
            // + '<img src="https://coindodo.io/images/channel_'
			// + data.claim_ids[i]
        	// + '" width="25px" height="25px" style="margin-top:auto;margin-bottom:auto;" alt="cover">'

        sub_data += '<td class="channel"><a href="https://odysee.com/@'
            + data.vanity_names[i]
            + ':'
            + data.claim_ids[i]
            + '" nsfw="'
            + data.is_nsfw[i]
            + '" grey="'
            + data.grey[i]
            + '" class="lbry-url" target="_blank" rel="noopener noreferrer" lbrychannel="'
            + data.vanity_names[i].toLowerCase()
            + '" title="Odysee Channel: '
            + data.titles[i]
            + '">'
            + '<span class="at-sign">@</span>'
            + data.vanity_names[i]
            + '</a><span class="tag-1" '
            + 'tag1="'
            + data.vanity_names[i]
            + '"></span><span class="tag-2a" '
            + 'tag2a="'
            + data.vanity_names[i]
            + '"></span><span class="tag-2" '
            + 'tag2="'
            + data.vanity_names[i]
            + '"></span><span class="tag-2b" '
            + 'tag2b="'
            + data.vanity_names[i]
            + '"></span><span class="tag-3" '
            + 'tag3="'
            + data.vanity_names[i]
            + '"></span><span class="tag-4" '
            + 'tag4="'
            + data.vanity_names[i]
            + '"></span><span class="tag-5" '
            + 'tag5="'
            + data.vanity_names[i]
            + '"></span><span class="tag-6" '
            + 'tag6="'
            + data.vanity_names[i]
            + '"></span><span class="tag-7" '
            + 'tag7="'
            + data.vanity_names[i]
            + '"></span><span class="tag-8" '
            + 'tag8="'
            + data.vanity_names[i]
            + '"></span><span class="whale-bot" '
            + 'claimID="'
            + data.claim_ids[i]
            + '"></span></td>';

        // LBCs
 
        sub_data += '<td class="lbcs"><a href="https://currencio.co/lbc/usd/'
            + Math.ceil(data.lbc[i])
            + '/#'
            + data.vanity_names[i]
            + '" target="_blank" rel="noopener noreferrer" title="Convert '
            + Math.ceil(data.lbc[i]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + ' LBC to USD">'
            + Math.ceil(data.lbc[i]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</a></td>';
          
        // Followers

        sub_data += '<td class="subs">'
            + data.subscribers[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</td>';

        // Views

        sub_data += '<td class="views" data-color="'
            + data.views[i]
            + '"><p>'
            + data.views[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</p></td>';

        // reposts

        sub_data += '<td class="reposts" data-color="'
            + data.times_reposted[i]
            + '"><p>'
            + data.times_reposted[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</p></td>';

        // Likes

        sub_data += '<td class="olikes"><p>'
            + data.likes[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</p></td>';

        // Dislikes

        sub_data += '<td class="odislikes"><p>'
            + data.dislikes[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</p></td>';
          
        // Folower Change

        sub_data += '<td class="follower-change change-color" data-new="'
            + data.new_type[i]
            + '"data-color="'
            + data.change[i]
            + '"><p>'
            + data.change[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</p></td>';          

        // Views Change

        sub_data += '<td class="views-change change-color" data-color="'
            + data.views_change[i]
            + '"><p>'
            + data.views_change[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</p></td>';

        //Reposts Change

        sub_data += '<td class="reposts-change change-color" data-color="'
            + data.times_reposted_change[i]
            + '"><p>'
            + data.times_reposted_change[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</p></td>';

        // Rank Change

        sub_data += '<td class="rank-change change-color" data-color="'
            + data.rank_change[i]
            + '"><p>'
            + data.rank_change[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            + '</p></td></tr>';
          
      });
      $('#sub-stats').append(sub_data);
        
      	// Data Server Up/Down Checker
          
		const UnixTime = `${data.unix_time}`
		const UnixTimeNoFloat = parseInt(UnixTime, 10)
		const timeNow = Math.floor(Date.now() / 1000)
		const serverTimeAgoHours = ((timeNow - UnixTimeNoFloat) / 3600)
		const serverTimeAgo = parseFloat(serverTimeAgoHours).toFixed( 2 )
        $('.tlu').append(serverTimeAgo)
		console.log("Table Last Updated\n\n" + UnixTimeNoFloat + " < Last updated\n" + timeNow + " < Time now\n" + serverTimeAgo + " < Hours ago")
       
    // setTimeout(function() { $( 'tr.ln-row' ).slice( 0, 200 ).css( "display", "table-row" );}, 300);  


      
      /*$( 'tr.ln-row' ).slice( 500, 2000 ).css( "display", "none" );*/
      
      setTimeout(function() { $( 'tr.ln-row' ).slice( 0, 200 ).css( "display", "table-row" );}, 300);  
      setTimeout(function() { $( 'tr.ln-row' ).slice( 200, 500 ).css( "display", "table-row" );}, 1000);
	  setTimeout(function() { $( 'tr.ln-row' ).slice( 500, 1000 ).css( "display", "table-row" );}, 1500);
      setTimeout(function() { $( 'tr.ln-row' ).slice( 1000, 2000 ).css( "display", "table-row" );}, 2000);

    });  
    /*  
    $(document).ready(function() {
      $('[data-top500]').each(function() {
        if (parseInt($(this).data('data-top500')) === true) {
          $(this).addClass('top-500');
          console.log('data-top500');
      };
    });
    }); 
    */
    // Widgets

    // Stats 

    function fetchClaimsData() {
      $.ajax({
        url: '../data/streams_stats.json',
        type: 'get',
        success: function(data) {
          
          const totalStreams = `${data.total_streams}`
          $(".total-streams").html(Math.ceil(totalStreams).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newStreams1 = `${data.new_streams_1_hour}`
          $(".new-streams-1h").html(Math.ceil(newStreams1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newStreams24 = `${data.new_streams_24_hours}`
          $(".new-streams-24h").html(Math.ceil(newStreams24).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newStreams7 = `${data.new_streams_7_days}`
          $(".new-streams-7d").html(Math.ceil(newStreams7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newStreams30 = `${data.new_streams_30_days}`
          $(".new-streams-30d").html(Math.ceil(newStreams30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) 
        }
      });
    }
    $(document).ready(function() {
      setInterval(fetchClaimsData, 300000);
      fetchClaimsData();
      $.ajaxSetup({ cache: false });
    });

    // Channels  

    function fetchChannelData() {
      $.ajax({
        url: '../data/channels_stats.json',
        type: 'get',
        success: function(data) {

          const totalChannels = `${data.total_channels}`
          $(".total-channels").html(Math.ceil(totalChannels).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newChannels1 = `${data.new_channels_1_hour}`
          $(".new-channels-1h").html(Math.ceil(newChannels1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newChannels24 = `${data.new_channels_24_hours}`
          $(".new-channels-24h").html(Math.ceil(newChannels24).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newChannels7 = `${data.new_channels_7_days}`
          $(".new-channels-7d").html(Math.ceil(newChannels7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newChannels30 = `${data.new_channels_30_days}`
          $(".new-channels-30d").html(Math.ceil(newChannels30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        }
      });
    }
    $(document).ready(function() {
      setInterval(fetchChannelData, 300000);
      fetchChannelData();
      $.ajaxSetup({ cache: false });
    });

    // Reposts 

    function fetchRepostsData() {
      $.ajax({
        url: '../data/reposts_stats.json',
        type: 'get',
        success: function(data) {

          const totalReposts = `${data.total_reposts}`
          $(".total-reposts").html(Math.ceil(totalReposts).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newReposts1 = `${data.new_reposts_1_hour}`
          $(".new-reposts-1h").html(Math.ceil(newReposts1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newReposts24 = `${data.new_reposts_24_hours}`
          $(".new-reposts-24h").html(Math.ceil(newReposts24).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newReposts7 = `${data.new_reposts_7_days}`
          $(".new-reposts-7d").html(Math.ceil(newReposts7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const newReposts30 = `${data.new_reposts_30_days}`
          $(".new-reposts-30d").html(Math.ceil(newReposts30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        }
      });
    }
    $(document).ready(function() {
      setInterval(fetchRepostsData, 300000);
      fetchRepostsData();
      $.ajaxSetup({ cache: false });
    });

    // Boost Stats total  

    function fetchSupportsData() {
      $.ajax({
        url: '../data/supports_and_tips.json',
        type: 'get',
        success: function(data) {

          const numBoostsTotal = `${data.num_all_time}`
          $(".num-boosts-total").html(Math.ceil(numBoostsTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const lbcBoostsTotal = `${data.most_common_value_all_time.toFixed(2)}`
          $(".lbc-boosts-total").html(lbcBoostsTotal)
          
          const bigBoostsTotal = `${data.biggest_all_time}`
          $(".big-boosts-total").html('<a href="' 
            + data.tv_url_all_time
			+ '" target="_blank" rel="noopener noreferrer" title="Odysee Link Title: ' 
            + data.title_all_time 
            + '" nsfw="' 
            + data.is_nsfw_all_time
            + '" lbrychannel="' 
            + data.channel_title_all_time
            + '" lbry-data="' 
            + data.biggest_all_time 
            + '"">' 
            + Math.ceil(bigBoostsTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
            + '</a>')

          // Boost Stats 30 Days

          const numSupports30 = `${data.num_30_days}`
          $(".num-supports-30d").html(Math.ceil(numSupports30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const lbcSupports30 = `${data.most_common_value_30_days.toFixed(2)}`
          $(".lbc-supports-30d").html(lbcSupports30)
          
          const bigSupports30 = `${data.biggest_30_days}`
          $(".big-supports-30d").html('<a href="' 
            + data.tv_url_30_days 
            + '" target="_blank" rel="noopener noreferrer" title="Odysee Link Title: ' 
            + data.title_30_days 
            + '" nsfw="' 
            + data.is_nsfw_30_days
			+ '" lbrychannel="' 
            + data.channel_title_30_days
            + '" lbry-data="' 
            + data.biggest_30_days 
			+ '"">' 
            + Math.ceil(bigSupports30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
            + '</a>')

          // Boost Stats 7 Days

          const numSupports7 = `${data.num_7_days}`
          $(".num-supports-7d").html(Math.ceil(numSupports7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const lbcSupports7 = `${data.most_common_value_7_days.toFixed(2)}`
          $(".lbc-supports-7d").html(lbcSupports7)
          
          const bigSupports7 = `${data.biggest_7_days}`
          $(".big-supports-7d").html('<a href="' 
            + data.tv_url_7_days 
            + '" target="_blank" rel="noopener noreferrer" title="Odysee Link Title: ' 
            + data.title_7_days 
            + '" nsfw="' 
            + data.is_nsfw_7_days 
			+ '" lbrychannel="' 
            + data.channel_title_7_days 
            + '" lbry-data="' 
            + data.biggest_7_days 
            + '"">' 
            + Math.ceil(bigSupports7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
            + '</a>')

          // Boost Stats 24 hours

          const numSupports24 = `${data.num_24_hours}`
          $(".num-supports-24h").html(Math.ceil(numSupports24).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const lbcSupports24 = `${data.most_common_value_24_hours.toFixed(2)}`
          $(".lbc-supports-24h").html(lbcSupports24)
          
          const bigSupports24 = `${data.biggest_24_hours}`
          $(".big-supports-24h").html('<a href="' 
            + data.tv_url_24_hours 
            + '" target="_blank" rel="noopener noreferrer" title="Odysee Link Title: ' 
            + data.title_24_hours 
            + '" nsfw="' 
            + data.is_nsfw_24_hours
            + '" lbrychannel="' 
            + data.channel_title_24_hours
            + '" lbry-data="' 
            + data.biggest_24_hours 
            + '"">' 
            + Math.ceil(bigSupports24).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
            + '</a>')

          // Boost Stats 1 hours

          const numSupports1 = `${data.num_1_hour}`
          $(".num-supports-1h").html(Math.ceil(numSupports1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const lbcSupports1 = `${data.most_common_value_1_hour.toFixed(2)}`
          $(".lbc-supports-1h").html(lbcSupports1)
          
          const bigSupports1 = `${data.biggest_1_hour}`
          $(".big-supports-1h").html('<a href="' 
            + data.tv_url_1_hour 
            + '" target="_blank" rel="noopener noreferrer" title="Odysee Link Title: ' 
            + data.title_1_hour 
            + '" nsfw="' 
            + data.is_nsfw_1_hour 
			+ '" lbrychannel="' 
            + data.channel_title_1_hour                 
            + '" lbry-data="' 
            + data.biggest_1_hour 
            + '"">' 
            + Math.ceil(bigSupports1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
            + '</a>')
          
          // Data Server Up/Down Checker
          
		  const UnixTime = `${data.unix_time}`
		  const UnixTimeNoFloat = parseInt(UnixTime, 10)
          const timePlus = (UnixTimeNoFloat) + (1800)
		  const timeNow = Math.floor(Date.now() / 1000)
          const serverTimeAgoHours = ((timeNow - UnixTimeNoFloat) / 3600)
          const serverTimeAgo = parseFloat(serverTimeAgoHours).toFixed( 2 )
          
		  if (timeNow > timePlus ) {
              $("#down").css("display", "inline-block");
              $("#up").css("display", "none");
              console.log(UnixTimeNoFloat + " < Last updated\n" + timeNow + " < Time now\n" + serverTimeAgo + " < Hours ago")
              console.log(UnixTimeNoFloat + " < Data last updated\n" + timePlus + " < Data last updated + 30 minutes\n" +  timeNow + " < Time Now\n" + "LBRYnomics is Offline" );
 
          } else if (timeNow < timePlus ) {
             $("#up").css("display", "inline-block");
             $("#down").css("display", "none");
             console.log("Widgets Last Updated\n\n" + UnixTimeNoFloat + " < Last updated\n" + timeNow + " < Time now\n" + serverTimeAgo + " < Hours ago")
             console.log(UnixTimeNoFloat + " < Data last updated\n" + timePlus + " < Data last updated + 30 minutes\n" +  timeNow + " < Time Now\n" + "LBRYnomics is Online" );
          }          
        }
      });
    }
    $(document).ready(function() {
      setInterval(fetchSupportsData, 300000);
      fetchSupportsData();
      $.ajaxSetup({ cache: false });
    });

  // LBRYnomics Info 

    function fetchLBRYnomicsData() {
      $.ajax({
        url: '../data/lbrynomics.json',
        type: 'get',
        success: function(data) {

          const upTimeDays = `${data.uptime_days_at_last_measurement}`
          $(".uptime-days").html(Math.ceil(upTimeDays).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const activeData = `${data.active_measurements_in_db}`
          $(".active-data").html(Math.ceil(activeData).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const activeDataDays = `${data.days_with_active_measurements}`
          $(".active-data-days").html(Math.ceil(activeDataDays).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const historicalEstimates = `${data.historical_estimates_in_db}`
          $(".historical-estimates").html(Math.ceil(historicalEstimates).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          
          const topChannelDays = `${data.top_channel_days_in_db}`
          $(".top-channel-days").html(Math.ceil(topChannelDays).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        }
      });
    }
    $(document).ready(function() {
      setInterval(fetchLBRYnomicsData, 300000);
      fetchLBRYnomicsData();
      $.ajaxSetup({ cache: false });
    });

	// Open table in new browser tab
  	// Asign IDs
      
	// $(".et_pb_tab_0").attr("id","table");
	// $(".et_pb_tab_1").attr("id","widgets");
	// $(".et_pb_tab_2").attr("id","charts");
	// $(".et_pb_tab_3").attr("id","graphs");
	// $(".et_pb_tab_4").attr("id","sync");

    
    // Open table in new browser tab

	document.getElementsByClassName("et_pb_tab_0").ondblclick = function() {openTabs0()};
	function openTabs0() {
  	window.open("https://lbrynomics.com/table");
	};
    
	// Open widgets in new browser tab

	document.getElementsByClassName("et_pb_tab_1").ondblclick = function() {openTabs1()};
	function openTabs1() {
  	window.open("https://lbrynomics.com/widget");
	};
    
	// Open graphs in new browser tab

	document.getElementsByClassName("et_pb_tab_2").ondblclick = function() {openTabs2()};
	function openTabs2() {
 	window.open("https://lbrynomics.com/graphs");
	};

	// Open charts in new browser tab

	document.getElementsByClassName("et_pb_tab_3").ondblclick = function() {openTabs3()};
	function openTabs3() {
 	window.open("https://lbrynomics.com/charts");
	};

	// Open sync in new browser tab

	document.getElementsByClassName("et_pb_tab_4").ondblclick = function() {openTabs4()};
	function openTabs4() {
  	window.open("https://lbrynomics.com/sync");
	};

	// Themes Mode

	// High Contrast
    
	function readabilityStyle(){
	const element = document.getElementById("ln-content");
	element.classList.toggle('readability');
    };
    function myReadButtonChecked(){
	const element = document.getElementById("controlMenu");     
	element.classList.toggle('readButtonChecked');
    };   
    
	const accMode = document.querySelector("#readabiltyMode").addEventListener("click", function() {
        readabilityStyle()
   		myReadButtonChecked()
	});
  
  	// Dark Widgets
    
    function widgetStyle(){
	const element = document.getElementById("lnWidgets");
	element.classList.toggle('darkWidgets');
    };
    function myWidgetButtonChecked(){
	const element = document.getElementById("controlMenu");     
	element.classList.toggle('widgetButtonChecked');
    };  
  
	const darkWidgetsMode = document.querySelector("#darkModeWidgets").addEventListener("click", function() {
        widgetStyle()
   		myWidgetButtonChecked()
	});
    
   
   
 	// Send LBRYnomics to sleep
	// Check if I'm not editing first 
    
  	(function() {

    	const idleDurationSecs = 900;
    	const redirectUrl = '/sleeping';
    	let idleTimeout;
    	const resetIdleTimeout = function() {

        if (idleTimeout) clearTimeout(idleTimeout) && (document.location.href.indexOf('?et_fb=1') === -1);
        idleTimeout = setTimeout(() => location.href = redirectUrl, idleDurationSecs * 1000);
    	};

    resetIdleTimeout();

    ['click', 'touchstart', 'mousemove'].forEach(evt => 
        document.addEventListener(evt, resetIdleTimeout, false)
    );
	})();
        
});
