// 加载模块
// 加载 mongoose 模块
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 定义电影模式
var MovieSchema = new Schema({
    title: String,
    aka: String,
    poster: String,
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    directors: String,
    casts: String,
    year: Number,
    countries: String,
    summary: String,
    flash_url: String,
    clicks: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

// 定义电影模式方法
MovieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});
MovieSchema.statics = {
    fetch: function(cb) {// 取出目前数据库中所有的数据
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {// 查询单条数据
        return this.findOne({_id: id}).exec(cb);
    }
};

// 编译电影模型
var Movie = mongoose.model('Movie', MovieSchema);

// 导出电影模型
module.exports = Movie;