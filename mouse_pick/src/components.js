// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    });
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height };
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('PlainColorActor', {
  init: function() {
    this.requires('Actor, Solid, Color');
  }
});

// A Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
  init: function() {
    this.requires('PlainColorActor');
    this.color('rgb(40, 40, 40)');
  }
});

// A Bush is just an Actor with a certain sprite
Crafty.c('ClickableActor', {
  init: function() {
    this.requires('Actor, Mouse')
    .bind('Click', function() {
       console.log('Clicked the one at', this.x, this.y);
    })
    .areaMap([0,0], [this.w,0], [this.w,this.h], [0,this.h]);
  }
});

// A Bush is just an Actor with a certain sprite
Crafty.c('Bush', {
  init: function() {
    this.requires('PlainColorActor, ClickableActor')
    .bind('Click', function() {
       this.color('eedd82');
    });

    this.color('rgb(20, 185, 40)');
  }
});

// A Rock disappears the first time you click it
Crafty.c('Rock', {
  init: function() {
    this.requires('PlainColorActor, ClickableActor')
    .bind('Click', function() {
       this.destroy();
    })
    .color('rgb(150, 150, 150)');
  }
});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
  init: function() {
    this.requires('PlainColorActor');
    this.color('rgb(220, 185, 140)');
  }
});