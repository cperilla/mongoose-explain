module.exports = function(schema, pluginOptions) {
  schema.post('findOne', function(res, next) {
    if (this.options.explain) {
      return next();
    }

    var options = { explain: true };
    options.fields = this._castFields(this._fields);
    this._collection.findOne(this._conditions, options, function(error, stats) {
      if (pluginOptions && pluginOptions.callback) {
        pluginOptions.callback(stats);
      } else {
        console.dir(stats, { depth: null, colors: true });
      }
      next();
    });
  });

  schema.post('find', function(res, next) {
    if (this.options.explain) {
      return next();
    }

    var options = { explain: true };
    options.fields = this._castFields(this._fields);
    this._collection.find(this._conditions, options, function(error, stats) {
      if (pluginOptions && pluginOptions.callback) {
        pluginOptions.callback(stats);
      } else {
        console.dir(stats, { depth: null, colors: true });
      }
      next();
    });
  });

  schema.post('count', function(res, next) {
    if (this.options.explain) {
      return next();
    }

    var options = { explain: true };
        options.fields = this._castFields(this._fields);
    this._collection.find(this._conditions, options, function(error, stats) {
      if (pluginOptions && pluginOptions.callback) {
        pluginOptions.callback(stats);
      } else {
        console.dir(stats, { depth: null, colors: true });
      }
      next();
    });
  });


  if (pluginOptions && pluginOptions.aggregate !== false) {
    instrumentAggregate(schema, pluginOptions);
  }
}

function instrumentAggregate(schema, pluginOptions) {
  schema.post('aggregate', function(res, next) {
    if (this.options.explain) {
      return next();
    }

    var options = { explain: true };
    this._model.collection.aggregate(this._pipeline, options, function(error, stats) {
      if (pluginOptions && pluginOptions.callback) {
        pluginOptions.callback(stats);
      } else {
        console.dir(stats, { depth: null, colors: true });
      }
      next();
    });
  });
}
