var chai = require('chai');

var should = chai.should(),
    awcoordinates = require('../index'),
    find = awcoordinates.find,
    validate = awcoordinates.validate,
    normalize = awcoordinates.normalize,
    teleport = awcoordinates.teleport;
    
var expect = chai.expect(),
    awcoordinates = require('../index'),
    find = awcoordinates.find,
    validate = awcoordinates.validate,
    normalize = awcoordinates.normalize;
    
//var assert = chai.assert();
    
describe('#find', function() {
  it('returns a single iterate when it finds one coordinate string.', function() {
    var result = find('This string contains: aw 100s 100e');
    result.should.have.length(1);
    result[0].should.equal('aw 100s 100e');        
  });
  
  it('returns multiple iterates when it finds multiple coordinate strings.', function() {
    var result = find('This string contains aw 100s 100e and awteen 0n 0e 100a 360');
    result.should.have.length(2);
    result[0].should.equal('aw 100s 100e');    
    result[1].should.equal('awteen 0n 0e 100a 360');    
  });  
  
  it('handles coordinates matching: <worldname> <N/S position> <E/W position>', function() {
    find('This string contains aw 100s 100e').should.have.length(1);
    find('This string contains aw 100s 100e')[0].should.equal('aw 100s 100e');    
  });    
  
  it('handles coordinates matching: <worldname> <N/S position> <E/W position> <altitude as integer>', function() {
    find('This string contains awteen 0n 0w 10a').should.have.length(1);
    find('This string contains awteen 0n 0w 10a')[0].should.equal('awteen 0n 0w 10a');    
  });     

  it('handles coordinates matching: <worldname> <N/S position> <E/W position> <altitude as decimal>', function() {
    find('This string contains awteen 0n 0w 0.25a').should.have.length(1);
    find('This string contains awteen 0n 0w 0.25a')[0].should.equal('awteen 0n 0w 0.25a');    
  });   

  it('handles coordinates matching: <worldname> <N/S position> <E/W position> <altitude> <position>', function() {
    find('This string contains CofMeta 123N 456W 10a 180').should.have.length(1);
    find('This string contains CofMeta 123N 456W 10a 180')[0].should.equal('CofMeta 123N 456W 10a 180');    
  });   
  
  it('is case insensitive.', function() {
    find('THIS STRING CONTAINS MARS 100n 250E 10A 90').should.have.length(1);
    find('THIS STRING CONTAINS MARS 100n 250E 10A 90')[0].should.equal('MARS 100n 250E 10A 90');    
  }); 

  it('handles worldnames with special characters.', function() {
    var result = find('We are going to @Mart 10n 10w 0.5a 45 today!')
    result.should.have.length(1);
    result[0].should.equal('@Mart 10n 10w 0.5a 45');    
  });   
  
  it('enforce that worldnames are at least two characters long.', function() {
    var result = find('This world should not be found a 1s 1e 0a anywhere!')
    result.should.have.length(0);    
  });  

  it('handles negative altitude.', function() {
    var result = find('This location is underground, at Mutation 20n 20w -50a 180.')
    result.should.have.length(1);    
    result[0].should.equal('Mutation 20n 20w -50a 180');     
  });    
  
  it('handles negative altitude with a leading decimal.', function() {
    var result = find('This location is underground, at Mutation 20s 20e -0.5a 180.')
    result.should.have.length(1);    
    result[0].should.equal('Mutation 20s 20e -0.5a 180');     
  });    

  it('handles negative altitude with no leading decimal.', function() {
    var result = find('This location is underground, at Mutation 20s 20e -.5a 180.')
    result.should.have.length(1);    
    result[0].should.equal('Mutation 20s 20e -.5a 180');     
  });   
  
  it('handles north/south decimal positions.', function() {
    var result = find('This location is underground, at AD&DRPG 1000.5n 0e 0a 0.')
    result.should.have.length(1);    
    result[0].should.equal('AD&DRPG 1000.5n 0e 0a 0');     
  }); 

  it('handles east/west decimal positions.', function() {
    var result = find('This location is underground, at AD&DRPG 0n 1000.5e 0a 0.')
    result.should.have.length(1);    
    result[0].should.equal('AD&DRPG 0n 1000.5e 0a 0');     
  });      

  it('handles north/south decimal positions with no leading decimal.', function() {
    var result = find('This location is underground, at AD&DRPG .5n 0e 0a 0.')
    result.should.have.length(1);    
    result[0].should.equal('AD&DRPG .5n 0e 0a 0');     
  }); 

  it('handles east/west decimal positions with no leading decimal.', function() {
    var result = find('This location is underground, at AD&DRPG 0n .5e 0a 0.')
    result.should.have.length(1);    
    result[0].should.equal('AD&DRPG 0n .5e 0a 0');     
  });      
  
  it('handles custom whitespace characters.', function() {
    var result = find('AW_2217.4s_3609.8e_0a_90', '_')
    result.should.have.length(1);    
    result[0].should.equal('AW_2217.4s_3609.8e_0a_90');     
  });   

  it('rejects worldnames over 16 characters in length.', function() {
    var result = find('waytoomanycharacters 100s 100e 0a')
    result.should.have.length(0);    
  }); 

  it('handles coordinates that skip altitude.', function() {
    var result = find('AW 100s 100e 180') 
    result.should.have.length(1);    
    result[0].should.equal('AW 100s 100e 180');      
  }); 

  it('handles decimal altitudes.', function() {
    var result = find('AW 100s 100e 67.9') 
    result.should.have.length(1);    
    result[0].should.equal('AW 100s 100e 67.9');      
  });     

  it('handles decimal altitudes with no leading decimal.', function() {
    var result = find('AW 100s 100e .9') 
    result.should.have.length(1);    
    result[0].should.equal('AW 100s 100e .9');      
  });   
});

describe('#validate', function() {
  it('the coordinates as true: aw 100s 100e', function() {
    var result = validate('aw 100s 100e');
    result.should.be.true;    
  });
  
  it('the coordinates as true: awteen 0n 0e 1a', function() {
    var result = validate('awteen 0n 0e 1a');
    result.should.be.true;    
  });  
  
  it('the coordinates as true: awteen 0n 0e 0.5a', function() {
    var result = validate('awteen 0n 0e 0.5a');
    result.should.be.true;    
  });   
  
  it('the coordinates as true: CofMeta 10s 25w 0.5a 90', function() {
    var result = validate('CofMeta 10s 25w 0.5a 90');
    result.should.be.true;    
  }); 

  it('the coordinates as false: a 1n 1e 0a 0', function() {
    var result = validate('a 1n 1e 0a 0');
    result.should.be.false;    
  });  
  
  it('the coordinates as false: aw 1n 1e 0b', function() {
    var result = validate('aw 1n 1e 0b');
    result.should.be.false;    
  });   

  it('the coordinates as false: aw 1n 1e 0a test', function() {
    var result = validate('aw 1n 1e 0b test');
    result.should.be.false;    
  });    
  
  it('the coordinates as true: Mutation 20n 20w -50a 180', function() {
    var result = validate('Mutation 20n 20w -50a 180');
    result.should.be.true;       
  });    
  
  it('the coordinates as true: Mutation 20s 20e -0.5a 180', function() {
    var result = validate('Mutation 20s 20e -0.5a 180');
    result.should.be.true;      
  });      

  it('the coordinates as true: Mutation 20s 20e -.5a 180', function() {
    var result = validate('Mutation 20s 20e -.5a 180');
    result.should.be.true;      
  });    

  it('the coordinates as true: AD&DRPG 1000.5n 0e 0a 0', function() {
    var result = validate('AD&DRPG 1000.5n 0e 0a 0');
    result.should.be.true;      
  });   
  
  it('the coordinates as true: AD&DRPG 0n 1000.5e 0a 0', function() {
    var result = validate('AD&DRPG 0n 1000.5e 0a 0');
    result.should.be.true;      
  });    

  it('the coordinates as true: AD&DRPG .5n 0e 0a 0', function() {
    var result = validate('AD&DRPG .5n 0e 0a 0');
    result.should.be.true;      
  });   
  
  it('the coordinates as true: AD&DRPG 0n .5e 0a 0', function() {
    var result = validate('AD&DRPG 0n .5e 0a 0');
    result.should.be.true;      
  });   
  
  it('the coordinates as true: AW_2217.4s_3609.8e_0a_90', function() {
    var result = validate('AW_2217.4s_3609.8e_0a_90', '_');
    result.should.be.true;      
  });  
  
  it('the coordinates as false: waytoomanycharacters 100s 100e 0a', function() {
    var result = validate('waytoomanycharacters 100s 100e 0a', ' ');
    result.should.be.false;      
  });  

  it('the coordinates as true: AW 100s 100e 180', function() {
    var result = validate('AW 100s 100e 180');
    result.should.be.true;      
  });     
  
  it('the coordinates as true: AW 100s 100e 50.5', function() {
    var result = validate('AW 100s 100e 50.5');
    result.should.be.true;      
  }); 

  it('the coordinates as true: AW 100s 100e .5', function() {
    var result = validate('AW 100s 100e .5');
    result.should.be.true;      
  });   
});

describe('#normalize', function() {  
  it('aw 100s 100e', function() {
    var result = JSON.parse(normalize('aw 100s 100e', ' '));
    result.worldname.should.equal('aw');   
    result.stringParts.nsposition.should.equal('100s');    
    result.stringParts.ewposition.should.equal('100e');    
    result.stringParts.altitude.should.equal('0a');
    result.stringParts.direction.should.equal('0');    
    result.sdkParts.x.should.equal(-10000);    
    result.sdkParts.z.should.equal(-10000);    
    result.sdkParts.y.should.equal(0);
    result.sdkParts.yaw.should.equal(0);    
  });
  
  it('aw 200s 200e 20a 180', function() {
    var result = JSON.parse(normalize('aw 200s 200e 20a 180', ' '));
    result.description.should.equal('aw 200s 200e 20a 180');
    result.worldname.should.equal('aw');   
    result.stringParts.nsposition.should.equal('200s');    
    result.stringParts.ewposition.should.equal('200e');    
    result.stringParts.altitude.should.equal('20a');
    result.stringParts.direction.should.equal('180');
    result.sdkParts.x.should.equal(-20000);    
    result.sdkParts.z.should.equal(-20000);    
    result.sdkParts.y.should.equal(2000);    
    result.sdkParts.yaw.should.equal(1800);
  });  
  
  it('aw 300s 300e 300', function() {
    var result = JSON.parse(normalize('aw 300s 300e 300', ' '));
    result.description.should.equal('aw 300s 300e 300');
    result.worldname.should.equal('aw');   
    result.stringParts.nsposition.should.equal('300s');    
    result.stringParts.ewposition.should.equal('300e');    
    result.stringParts.altitude.should.equal('0a');
    result.stringParts.direction.should.equal('300');
    result.sdkParts.x.should.equal(-30000);    
    result.sdkParts.z.should.equal(-30000);    
    result.sdkParts.y.should.equal(0);    
    result.sdkParts.yaw.should.equal(3000);
  });    
  
  it('aw 4000.5s 4000.5e 20.5a 90', function() {
    var result = JSON.parse(normalize('aw 4000.5s 4000.5e 20.5a 90', ' '));
    result.description.should.equal('aw 4000.5s 4000.5e 20.5a 90');
    result.worldname.should.equal('aw');   
    result.stringParts.nsposition.should.equal('4000.5s');    
    result.stringParts.ewposition.should.equal('4000.5e');    
    result.stringParts.altitude.should.equal('20.5a');
    result.stringParts.direction.should.equal('90');
    result.sdkParts.x.should.equal(-400050);    
    result.sdkParts.z.should.equal(-400050);    
    result.sdkParts.y.should.equal(2050);    
    result.sdkParts.yaw.should.equal(900);
  });    

  it('aw 5000.0n 5000.5w -50.5a 123', function() {
    var result = JSON.parse(normalize('aw 5000.0n 5000.5w -50.5a 123', ' '));
    result.description.should.equal('aw 5000.0n 5000.5w -50.5a 123');
    result.worldname.should.equal('aw');   
    result.stringParts.nsposition.should.equal('5000.0n');    
    result.stringParts.ewposition.should.equal('5000.5w');    
    result.stringParts.altitude.should.equal('-50.5a');
    result.stringParts.direction.should.equal('123');
    result.sdkParts.x.should.equal(500050);    
    result.sdkParts.z.should.equal(500000);    
    result.sdkParts.y.should.equal(-5050);    
    result.sdkParts.yaw.should.equal(1230);
  });    
  
  it('aw 6000.0n 6000.0w -60.0a 75.5', function() {
    var result = JSON.parse(normalize('aw 6000.0n 6000.0w -60.0a 75.5', ' '));
    result.description.should.equal('aw 6000.0n 6000.0w -60.0a 75.5');
    result.worldname.should.equal('aw');   
    result.stringParts.nsposition.should.equal('6000.0n');    
    result.stringParts.ewposition.should.equal('6000.0w');    
    result.stringParts.altitude.should.equal('-60.0a');
    result.stringParts.direction.should.equal('75.5');
    result.sdkParts.x.should.equal(600000);    
    result.sdkParts.z.should.equal(600000);    
    result.sdkParts.y.should.equal(-6000);    
    result.sdkParts.yaw.should.equal(755);
  });      
  
  it('aw 7000.0n 7000.0w -70.0a .5', function() {
    var result = JSON.parse(normalize('aw 7000.0n 7000.0w -70.0a .5', ' '));
    result.description.should.equal('aw 7000.0n 7000.0w -70.0a .5');
    result.worldname.should.equal('aw');   
    result.stringParts.nsposition.should.equal('7000.0n');    
    result.stringParts.ewposition.should.equal('7000.0w');    
    result.stringParts.altitude.should.equal('-70.0a');
    result.stringParts.direction.should.equal('.5');
    result.sdkParts.x.should.equal(700000);    
    result.sdkParts.z.should.equal(700000);    
    result.sdkParts.y.should.equal(-7000);    
    result.sdkParts.yaw.should.equal(5);
  });   
});  
  
describe('#teleport', function() {  
  it('to aw 100s 100e', function() {
    var result = teleport('aw 100s 100e'); 
    result.should.equal('teleport aw 100s 100e 0a 0\r\n');
  });
});