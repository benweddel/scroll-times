var fpApp = {};

//Checks screen width | height
fpApp.screenWidth = jQuery(window).width();
fpApp.screenHeight = jQuery(window).height();

//Init function
fpApp.init = function(){
  //will run scroll effects if screen width is > 900px
  if (fpApp.screenWidth >= 900) {
    //if screen height is > 810 will adjust scroll effects to center of screen
    if (fpApp.screenHeight >=810) {
      fpApp.controller = new ScrollMagic({globalSceneOptions: {triggerHook:0.45}});
      jQuery('.fpWrapper').css({'padding-top':'10%'});
    } else {
      fpApp.controller = new ScrollMagic();
    }
    fpApp.animate1();
  }
};

//Detect IE8
var oldIE;
if (jQuery('html').hasClass('ie8')) {
  oldIE = true;
}
if (oldIE) {
  jQuery('.fpWrapper').children().hide();
  jQuery('.fpWrapper').append('<h1>We have detected you are using an old Internet browser. Please upgrade your Internet browser to fully experience this site.</h1>')
}

fpApp.animate1 = function(){
  // TWEEN - hide the fixed nav
  fpApp.hideNav = new TimelineMax().add([
    TweenMax.allTo(['.logo', '.main_menu', '#header_meta'], 0.1, {
      display: 'none'
    }),
    TweenMax.to('#advanced_menu_toggle', 0.1, {
      display: 'block',
      delay: 0.1
    }),
    TweenMax.from('#requestBtn', 0.1, {
      opacity: 0,
      delay: 0.1
    }),
    TweenMax.allTo(['.logo', '.main_menu'], 1, {
      display: 'block',
      delay: 100
    }),
    TweenMax.allTo(['#advanced_menu_toggle','#requestBtn'], 1, {
      display: 'none',
      delay: 99
    }),
    TweenMax.to('#header_main', 0.01, {
      display: 'block',
      backgroundColor: 'rgba(255,255,255,0.9)',
      delay: 100
    })
  ]);

  // SCENE - hide the fixed nav
  fpApp.sceneNav = new ScrollScene({
    triggerElement: '#drawerContainer',
    offset: 65,
    duration: 6650
  })
  .setTween(fpApp.hideNav)
  .addTo(fpApp.controller);
  // fpApp.sceneNav.addIndicators({suffix: 'hide-nav'});

  // SCENE - pins the biblio core
  fpApp.scenePinCore = new ScrollScene({
    triggerElement: '#drawerContainer',
    offset: 100,
    duration: 6200
  })
  .setPin('#bibCore')
  .addTo(fpApp.controller);
  // fpApp.scenePinCore.addIndicators({suffix: 'pin-core____________________________________________'});

  //Progress Bar TWEENS & SCENES
  fpApp.progress = function(elem1,elem2) {
    var progressBar = new TimelineMax().add([
      TweenMax.to((elem1), 0.2, {
        width: '25px'
      }),
      TweenMax.to((elem2), 0.2, {
        width: '10px'
      })
    ]);
    return progressBar;
  };

  //TWEENS for the home page side progress bar
  fpApp.prog1 = new ScrollScene({
    triggerElement: '#drawerContainer',
    offset: 100
  })
  .setTween(fpApp.progress('#pb1','#pb2'))
  .addTo(fpApp.controller);

  fpApp.prog2 = new ScrollScene({
    triggerElement: '#bibPatron'
  })
  .setTween(fpApp.progress('#pb2','#pb1'))
  .addTo(fpApp.controller);

  fpApp.prog3 = new ScrollScene({
    triggerElement: '#bibLibrary'
  })
  .setTween(fpApp.progress('#pb3','#pb2'))
  .addTo(fpApp.controller);

  fpApp.prog4 = new ScrollScene({
    triggerElement: '#bibConnect'
  })
  .setTween(fpApp.progress('#pb4','#pb3'))
  .addTo(fpApp.controller);

  fpApp.prog5 = new ScrollScene({
    triggerElement: '#bibStory1'
  })
  .setTween(fpApp.progress('#pb5','#pb4'))
  .addTo(fpApp.controller);

  fpApp.prog6 = new ScrollScene({
    triggerElement: '#patronLove'
  })
  .setTween(fpApp.progress('#pb6','#pb5'))
  .addTo(fpApp.controller);

  fpApp.prog7 = new ScrollScene({
    triggerElement: '#libLogos'
  })
  .setTween(fpApp.progress('#pb7','#pb6'))
  .addTo(fpApp.controller);

  //distance drawer items will travel in pixels
  fpApp.animate1.drDist = 180;
  fpApp.animate1.drDist2 = 50;
  fpApp.animate1.drDist3 = 35;
  //angle drawer piece will travel
  fpApp.animate1.drRightAng = 30;
  fpApp.animate1.drBottomAng = 90;
  fpApp.animate1.drFrontAng = 120;
  fpApp.animate1.drLeftAng = 180;
  fpApp.animate1.drBackAng = 350;
  
  fpApp.animate1.drCard1Ang = 180;
  fpApp.animate1.drCard2Ang = 130;
  fpApp.animate1.drCard3Ang = 105;
  
  fpApp.animate1.drCard4Ang = 220;
  fpApp.animate1.drCard5Ang = 270;
  fpApp.animate1.drCard6Ang = 320;
  
  fpApp.animate1.drCard7Ang = 50;
  fpApp.animate1.drCard8Ang = 0;

  //calculates the y (horizontal) flyOut value
  fpApp.flyOutY = function(yVal,dist){
    var y = Math.sin(yVal*Math.PI/180)*dist;
    return '+='+y;
  };
  //calculates the x (vertical) flyOut value
  fpApp.flyOutX = function(xVal,dist){
    var x = Math.cos(xVal*Math.PI/180)*dist;
    return '+='+x;
  };

  //TWEEN - drawer explode part 1
  fpApp.drawerExplode = new TimelineMax().add([
    TweenMax.to('#drBottom', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drBottomAng,fpApp.animate1.drDist2),
      left: fpApp.flyOutX(fpApp.animate1.drBottomAng,fpApp.animate1.drDist2),
      opacity: 0
    }),
    TweenMax.to('#drRight', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drRightAng,fpApp.animate1.drDist2),
      left: fpApp.flyOutX(fpApp.animate1.drRightAng,fpApp.animate1.drDist2),
      opacity: 0
    }),
    TweenMax.to('#drFront', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drFrontAng,fpApp.animate1.drDist2),
      left: fpApp.flyOutX(fpApp.animate1.drFrontAng,fpApp.animate1.drDist2),
      opacity: 0
    }),
    TweenMax.to('#drLeft', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drLeftAng,fpApp.animate1.drDist2),
      left: fpApp.flyOutX(fpApp.animate1.drLeftAng,fpApp.animate1.drDist2),
      opacity: 0
    }),
    TweenMax.to('#drBack', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drBackAng,fpApp.animate1.drDist2),
      left: fpApp.flyOutX(fpApp.animate1.drBackAng,fpApp.animate1.drDist2),
      opacity: 0
    }),
    TweenMax.to('#drCard3', 1, {
      top: '85',
      left: '250'
    }),
    TweenMax.to('#drCard1', 1, {
      top: '84',
      left: '131'
    }),
    TweenMax.to('#drCard2', 1, {
      top: '109',
      left: '228'
    }),
    TweenMax.to('#drCard4', 1, {
      top: '84',
      left: '228'
    }),
    TweenMax.to('#drCard5', 1, {
      top: '59',
      left: '250'
    }),
    TweenMax.to('#drCard6', 1, {
      top: '84',
      left: '270'
    }),
    TweenMax.to('#drCard7', 1, {
      top: '110',
      left: '270'
    }),
    TweenMax.to('#drCard8', 1, {
      top: '85',
      left: '370'
    }),
    TweenMax.to('#bibTitle', 1, {
      opacity: 0
    })
  ]);

  //SCENE - drawer explode part 1
  fpApp.drawer1 = new ScrollScene({
    triggerElement: '#drawerContainer',
    offset: 100,
    duration: 80
  })
  .setTween(fpApp.drawerExplode)
  .addTo(fpApp.controller);
  // fpApp.drawer1.addIndicators({suffix: 'dr Expl1_____________________'});

  //TWEEN - drawer explosion part 2
  fpApp.drawerExplode2 = new TimelineMax().add([
    TweenMax.from('#introText', 1, {
      opacity: 0
    }),
    TweenMax.to('#drCard1', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drCard1Ang,fpApp.animate1.drDist),
      left: fpApp.flyOutX(fpApp.animate1.drCard1Ang,fpApp.animate1.drDist)
    }),
    TweenMax.to('#drCard2', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drCard2Ang,fpApp.animate1.drDist),
      left: fpApp.flyOutX(fpApp.animate1.drCard2Ang,fpApp.animate1.drDist)
    }),
    TweenMax.to('#drCard4', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drCard4Ang,fpApp.animate1.drDist),
      left: fpApp.flyOutX(fpApp.animate1.drCard4Ang,fpApp.animate1.drDist)
    }),
    TweenMax.to('#drCard5', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drCard5Ang,fpApp.animate1.drDist),
      left: fpApp.flyOutX(fpApp.animate1.drCard5Ang,fpApp.animate1.drDist)
    }),
    TweenMax.to('#drCard6', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drCard6Ang,fpApp.animate1.drDist),
      left: fpApp.flyOutX(fpApp.animate1.drCard6Ang,fpApp.animate1.drDist)
    }),
    TweenMax.to('#drCard7', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drCard7Ang,fpApp.animate1.drDist),
      left: fpApp.flyOutX(fpApp.animate1.drCard7Ang,fpApp.animate1.drDist)
    }),
    TweenMax.to('#drCard8', 1, {
      top: fpApp.flyOutY(fpApp.animate1.drCard8Ang,fpApp.animate1.drDist),
      left: fpApp.flyOutX(fpApp.animate1.drCard8Ang,fpApp.animate1.drDist)
    }),
    TweenMax.allTo(['#drCard1','#drCard2','#drCard4','#drCard5','#drCard6','#drCard7','#drCard8'], 0.5, {
      opacity: 0,
      delay: 1.5
    })
  ]);

  //SCENE - drawer explosion part 2
  fpApp.scene2 = new ScrollScene({
    triggerElement: '#drawerContainer',
    offset: 180,
    duration: 390
  })
  .setTween(fpApp.drawerExplode2)
  .addTo(fpApp.controller);
  // fpApp.scene2.addIndicators({suffix: 'dr expl2'});

  //TWEEN - core expansion
  fpApp.bibCoreExp = new TimelineMax().add([
    TweenMax.from('#bibCore',0.01, {
      opacity: 0
    }),
    TweenMax.from('#bibCore',1, {
      transform: 'scale(0.045)',
      marginTop: '35px'
    }),
    TweenMax.to('#drawerContainer',1, {
      opacity: 0,
      delay: 0.8
    })
  ]);

  //SCENE - core expansion
  fpApp.scenebib = new ScrollScene({
    triggerElement: '#drawerContainer',
    offset: 530,
    duration: 330
  })
  .setTween(fpApp.bibCoreExp)
  .addTo(fpApp.controller);
  // fpApp.scenebib.addIndicators({suffix: 'core exp'});

  //TWEEN - fade in start text
  fpApp.startText = new TimelineMax().add([
    TweenMax.from('#startText', 2, {
      opacity:0,
    }),
    TweenMax.to('#startText', 1, {
      opacity:0,
      delay: 2
    }),
    TweenMax.from('#bibText', 2, {
      opacity:0,
      delay: 2.5
    })
  ]);

  //SCENE - fade in start text
  fpApp.scene4 = new ScrollScene({
    triggerElement: '#drawerContainer',
    offset: 600,
    duration: 300
  })
  .setTween(fpApp.startText)
  .addTo(fpApp.controller);
  // fpApp.scene4.addIndicators({suffix: 'txt fad'});

  //SCENE - pin drawer container
  fpApp.drawerPin = new ScrollScene({
   triggerElement: '#drawerContainer',
   offset: 100,
   duration: 720
  })
  .setPin('#drawerContainer')
  .addTo(fpApp.controller);
  // fpApp.drawerPin.addIndicators({suffix: 'dr pin_______'});

  //fly speeds tied to scroll pixel distances
  fpApp.avgScroll = 400;

  //TWEEN - biblio features fade
  fpApp.bibFeatures = new TimelineMax().add([
    TweenMax.allFrom(['#featTag','#bibFSearch','#bibFExplore','#bibFBorrow','#bibFDoMore'], 1, {
      opacity: 0
    }),
    TweenMax.allTo(['#featTag','#bibFSearch','#bibFExplore','#bibFBorrow','#bibFDoMore'], 1, {
      opacity: 0,
      delay: 2
    })
  ]);

  //SCENE - biblio features fade
  fpApp.scene5 = new ScrollScene({
    triggerElement: '#bibFeatures',
    duration: fpApp.avgScroll
  })
  .setClassToggle('#bibFeatures', 'visible')
  .setPin('#bibFeatures')
  .setTween(fpApp.bibFeatures)
  .addTo(fpApp.controller);
  // fpApp.scene5.addIndicators({suffix: 'feat'});

  //SCENE - pin logo 1 section
  fpApp.scene9 = new ScrollScene({
    triggerElement: '#bibPatron',
    duration: 800
  })
  .setPin('#bibPatron')
  .addTo(fpApp.controller);
  // fpApp.scene9.addIndicators();

  //TWEEN - logos 1 fade
  fpApp.bibPatron = new TimelineMax().add([
    TweenMax.allFrom(['#patronText','#iconServer','#patronLogos','#dataTrnf'], 1, {
      opacity: 0
    }),
    TweenMax.allTo(['#patronText','#patronLogos'], 1, {
      opacity: 0,
      delay: 2
    })
  ]);

  //SCENE - logos 1 fade
  fpApp.scene8 = new ScrollScene({
    triggerElement: '#bibPatron',
    duration: fpApp.avgScroll
  })
  .setTween(fpApp.bibPatron)
  .addTo(fpApp.controller);
  // fpApp.scene8.addIndicators({suffix: 'logos1'});

  //TWEEN - data transfer effect
  fpApp.dataEffect = new TimelineMax().add([
    TweenMax.allTo(['#dc1','#dc2','#dc3'],1, {
      opacity: 0,
      repeat: -1,
      yoyo: true
    }, 0.33),
    TweenMax.allTo(['#dc6','#dc5','#dc4'],1, {
      opacity: 0,
      repeat: -1,
      yoyo: true
    }, 0.33)
  ]);

  //SCENE - data transfer effect
  fpApp.dataScene = new ScrollScene({
    triggerElement: '#bibPatron'
  })
  .setTween(fpApp.dataEffect)
  .addTo(fpApp.controller);
  // fpApp.dataScene.addIndicators();

  //TWEEN - logos 2 fade
  fpApp.bibPatron2 = new TimelineMax().add([
    TweenMax.allFrom(['#patronText2','#patronLogo1','#patronLogo2','#patronLogo3'], 1, {
      opacity: 0
    }),
    TweenMax.allTo(['#patronText2','#patronLogo1','#patronLogo2','#patronLogo3','#iconServer'], 1, {
      opacity: 0,
      delay: 2
    }),
    TweenMax.to('#dataTrnf', 1, {
      display: 'none',
      delay: 2
    })
  ]);

  // SCENE - logos 2 fade
  fpApp.scene11 = new ScrollScene({
    triggerElement: '#bibPatron',
    offset: 400,
    duration: fpApp.avgScroll
  })
  .setTween(fpApp.bibPatron2)
  .addTo(fpApp.controller);
  // fpApp.scene11.addIndicators();

  //TWEEN - library section fade in
  fpApp.bibLibrary = new TimelineMax().add([
    TweenMax.to('#bibText', 1, {
      opacity: 0
    }),
    TweenMax.allFrom(['#librarian','#libraryTag'], 1, {
      opacity: 0
    }),
    TweenMax.from('#libraryText1', 1, {
      opacity: 0,
      delay: 0.5
    })
  ]);

  //SCENE - library section fade in
  fpApp.scene13 = new ScrollScene({
    triggerElement: '#bibLibrary',
    duration: 150
  })
  .setTween(fpApp.bibLibrary)
  .addTo(fpApp.controller);
  // fpApp.scene13.addIndicators();

  //TWEEN - library expand and icon display
  fpApp.bibLibExp = new TimelineMax().add([
    TweenMax.to('#bibCore', 1, {
      height: '240px',
      width: '240px'
    }),
    TweenMax.to('#bibCore', 1, {
      css: {marginLeft: '-20px', marginTop: '-20px', width: '280px', height: '280px' },
      delay: 0.1
    }),
    TweenMax.to('#librarian', 1, {
      top: '+=30',
      delay: 0.1
    }),
    TweenMax.allFrom(['#libraryText2','#iconComp'], 1, {
      opacity: 0,
      delay: 1
    }),
    TweenMax.allFrom(['#iconList','#iconQuestion','#iconComment','#iconEvent'], 1, {
      opacity: 0,
      delay: 2
    }, 0.5),
    TweenMax.allTo(['#iconEvent','#iconComment','#iconList','#iconQuestion','#libraryTag','#libraryText1','#libraryText2'], 1, {
      opacity: 0,
      delay: 5
    }),
    TweenMax.to('#bibCore', 1, {
      css: { marginLeft: '0px', width: '240px', height: '240px'},
      delay: 5
    }),
    TweenMax.allTo(['#librarian','#iconComp'], 1, {
      opacity: 0,
      top: '-=37',
      delay: 5
    }),
    TweenMax.to('#bibText', 1, {
      opacity: 1,
      delay: 5
    })
  ]);

  //SCENE - library expand and icon display
  fpApp.scene144 = new ScrollScene({
    triggerElement: '#bibLibrary',
    offset: 150,
    duration: 650
  })
  .setTween(fpApp.bibLibExp)
  .addTo(fpApp.controller);
  // fpApp.scene144.addIndicators();

  //SCENE - pins library
  fpApp.scene14 = new ScrollScene({
    triggerElement: '#bibLibrary',
    duration: (fpApp.scene13.duration()+fpApp.scene144.duration())
  })
  .setPin('#bibLibrary')
  .addTo(fpApp.controller);
  // fpApp.scene14.addIndicators();
  
  //TWEEN - connect section fade in
  fpApp.bibConnect = new TimelineMax().add([
    TweenMax.from('#connectText', 1, {
      opacity: 0
    }),
    TweenMax.from('.cs1', 1, {
      opacity: 0,
      top: '+=30'
    }),
    TweenMax.from('.lib-icon', 1, {
      opacity: 0
    })
  ]);

  //SCENE - connect section fade in
  fpApp.scene16 = new ScrollScene({
    triggerElement: '#bibConnect',
    duration: 250
  })
  .setTween(fpApp.bibConnect)
  .addTo(fpApp.controller);
  // fpApp.scene16.addIndicators();

  //TWEEN - bring in connect icons
  fpApp.bibConnectLoop = new TimelineMax().add([
    TweenMax.to('.cs1', 1, {
      opacity: 0,
      top: '-=30'
    }),
    TweenMax.from('.cs2', 1, {
      opacity: 0,
      top: '+=30',
      delay: 1
    }),
    TweenMax.from('.libr-icon', 1, {
      opacity: 0,
      delay: 1
    }),
    TweenMax.to('.cs2', 1, {
      opacity: 0,
      top: '-=30',
      delay: 2
    }),
    TweenMax.from('.cs3', 1, {
      opacity: 0,
      top: '+=30',
      delay: 3,
    }),
    TweenMax.from('.usr-icon', 1, {
      opacity: 0,
      delay: 3
    }),
    TweenMax.allTo(['#connectText','#connectGrp1','#connectGrp2'], 1, {
      opacity: 0,
      delay: 5
    }),
    TweenMax.to('.cs3', 1, {
      top: '-=30',
      opacity: 0,
      delay: 5
    })
  ]);

  //SCENE - bring in connect icons
  fpApp.scene18 = new ScrollScene({
    triggerElement: '#bibConnect',
    offset: 200,
    duration: 700
  })
  .setTween(fpApp.bibConnectLoop)
  .addTo(fpApp.controller);
  // fpApp.scene18.addIndicators();

  //SCENE - pins the connect section
  fpApp.scene17 = new ScrollScene({
    triggerElement: '#bibConnect',
    duration: (fpApp.scene16.duration()+fpApp.scene18.duration())
  })
  .setClassToggle('#bibConnect', 'visible')
  .setPin('#bibConnect')
  .addTo(fpApp.controller);
  // fpApp.scene17.addIndicators();


  //TWEEN - story 1 section
  fpApp.bibStory1 = new TimelineMax().add([
    //This first tweenmax below is strictly for IE compatibility (on reverse scroll)
    TweenMax.from('#bibCore',1, {
      width: '240px',
      height: '240px'
    }),
    TweenMax.to('#bibText', 1, {
      opacity: 0
    }),
    TweenMax.to('#bibCore', 3, {
      css: {marginLeft: '106px', marginTop: '106px', width: '28px', height: '28px'},
      delay: 1
    }),
    TweenMax.to('#bibCore', 1, {
      backgroundColor: "#51B2A1",
      delay: 4
    }),
    TweenMax.allFrom(['#storyTag1','#perfink'], 1, {
      opacity: 0,
      delay: 4.5
    }),
    TweenMax.allTo(['#storyTag1','#perfink'], 1, {
      opacity: 0,
      delay: 8.5
    }),
    TweenMax.to('#bibCore', 0.1, {
      backgroundColor: '#fff',
      delay: 9.4
    }),
    TweenMax.to('#bibCore', 3, {
      css: {marginLeft: '0', marginTop: '0', height: '240px', width: '240px'},
      delay: 9.5
    })
  ]);

  //SCENE - story 1 section
  fpApp.scene25 = new ScrollScene({
    triggerElement: '#bibStory1',
    duration: 600
  })
  .setTween(fpApp.bibStory1)
  .setPin('#bibStory1')
  .addTo(fpApp.controller);
  // fpApp.scene25.addIndicators();

  // TWEEN - pulse effect
  fpApp.pulseEffect = TweenMax.to("#bibPulse", 1, {
    scale:3,
    opacity: 0,
    repeat:-1
  });
  
  // SCENE - pulse effect
  fpApp.pulseScene = new ScrollScene({
    triggerElement: "#bibStory1",
    duration: 200,
    offset: 200
  })
  .setTween(fpApp.pulseEffect)
  .setClassToggle('#pulseContainer', 'showMe')
  .addTo(fpApp.controller);
  // fpApp.pulseScene.addIndicators({suffix: 'PULSE'});

  //SCENE - pin bibCatalog
  fpApp.scene20 = new ScrollScene({
    triggerElement: '#bibCatalog',
    duration: 750
  })
  .setPin('#bibCatalog')
  .addTo(fpApp.controller);
  // fpApp.scene20.addIndicators();

  //TWEEN - catalog section
  fpApp.bibCatalog = new TimelineMax().add([
    TweenMax.from('#catalogTag', 1, {
      opacity: 0
    }),
    TweenMax.to('#bibText', 1, {
      opacity: 1
    }),
    TweenMax.allFrom(['#bibCCMS','#bibCDigital','#bibCMobile','#bibCEvents','#bibCSummer','#bibCSuggest','#bibCReader','#bibCBuy'], 1, {
      transform: 'scale(0)',
      delay: 0.75
    }, 0.5),
    TweenMax.to('#bibCatalog', 2, {
      transform: 'scale(0)',
      ease: Back.easeIn,
      delay: 6.5
    })
  ]);

  //SCENE - catalog section
  fpApp.scene21 = new ScrollScene({
    triggerElement: '#bibCatalog',
    duration: 750
  })
  .setTween(fpApp.bibCatalog)
  .addTo(fpApp.controller);
  // fpApp.scene21.addIndicators();

  //TWEEN - patron love section
  fpApp.bibPatronLove = new TimelineMax().add([
    TweenMax.to('#bibCore', 1, {
      opacity: 0
    }),
    TweenMax.from('#bibLove', 1, {
      opacity: 0
    }),
    TweenMax.from('#bibPatronLove', 1, {
      opacity: 0,
      delay: 0.2
    }),
    TweenMax.allFrom(['#feedback1','#feedback2','#feedback3','#feedback4','#feedback5','#feedback6','#pl-button'], 1, {
      opacity: 0,
      delay: 1
    }, 1)
  ]);

  //SCENE - patron love section
  fpApp.scene22 = new ScrollScene({
    triggerElement: '#patronLove',
    duration: 400
  })
  .setTween(fpApp.bibPatronLove)
  .setPin('#patronLove')
  .addTo(fpApp.controller);
  // fpApp.scene22.addIndicators();
};

jQuery(function(){
  fpApp.init();
});