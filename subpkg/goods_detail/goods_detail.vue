<template>
	<view v-if="goods_info.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i" >
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box" >
			<view class="price">
				￥{{goods_info.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				
				<view class="fnavi">
					<uni-icons type="star"></uni-icons>
					<text>收藏</text>
				</view>
				
			</view>
			<view class="yf">快递：免运费</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations, mapGetters} from "vuex"
	
	export default {
		computed:{
			...mapState('m_cart',[]),
			...mapGetters('m_cart',['total'])
		},
		watch: {
			
			total:{
				handler(newVal){
					const findResult = this.options.find((x) => x.text === '购物车')
					if(findResult){
					
						findResult.info = newVal
					}
					
				},
				immediate: true	
			}
			
		},
		data() {
			return {
				goods_info: {},
				options: [ {
							icon: 'shop',
							text: '店铺',
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 0
						}],
				buttonGroup: [{
				  text: '加入购物车',
				  backgroundColor: '#ff0000',
				  color: '#fff'
				},
				{
				  text: '立即购买',
				  backgroundColor: '#ffa200',
				  color: '#fff'
				}
				]
			  
			};
		},

		onLoad(option) {
			this.getGoodsInfo(option)
		},
		methods:{
			...mapMutations('m_cart', ['addToCart']),
			buttonClick(e){
				// console.log(e);
				if(e.content.text === '加入购物车'){
					const goods = {
						//{ goods_id, goods_name, goods_price, goods_count,goods_small_logo, goods_state }
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
						
					}
					this.addToCart(goods)
				}
				
			},
			 async getGoodsInfo(option){
				const goods_id = option.goods_id;
				
				const res = (await uni.$http.get('/api/public/v1/goods/detail', {goods_id}) ).data
				if(res.meta.status != 200) {
					uni.$showMsg()
					return
				}
				res.message.goods_introduce=res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"') // 正则表达式替换
				res.message.goods_introduce=res.message.goods_introduce.replace(/.webp/g,'.jpg') // 正则表达式替换
				
				this.goods_info  = res.message
				
				
			},
			preview(i){
				uni.previewImage({
					current:i,
					urls:this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				// console.log(e);
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			}
			
		}
		
		
	}
</script>

<style lang="scss">
	swiper{
		height: 750rpx;
		
		image{
			height: 100%;
			width: 100%;
		}
	}
	
	.goods-info-box{
		padding: 10px;
		padding-right: 0;
		
		.price{
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}
		
		.goods-info-body{
			display: flex;
			justify-content: space-between;
			.goods-name{
				font-size: 13px;
				padding-right: 10px;
			}
			.fnavi{
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}
		.yf{
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
		
		
	}
	.goods-nav{
		position: sticky;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	
</style>
