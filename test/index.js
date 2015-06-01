var should = require('chai').should(),
    awcoordinates = require('../index'),
    find = awcoordinates.find,
    validate = awcoordinates.validate;
    
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

  it('truncates worldnames over 16 characters in length.', function() {
    var result = find('?sixteencharacter 100s 100e')
    result.should.have.length(1);   
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
});