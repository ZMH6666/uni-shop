<template>
	<view class="my-userinfo-container">
		
		<!-- 头像和昵称 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">
				{{userinfo.nickName}}
			</view>
		</view>

		<!-- 面板的列表区域 -->
		<view class="panel-list">
		<!-- 第一个面板 -->
			<view class="panel">
			<!-- panel 的主体区域 -->
				<view class="panel-body">
				<!-- panel 的 item 项 -->
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="../../static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
				
			</view>
			
			<view class="panel">
				<view class="panel-list-item">
					<text>收获地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<!-- <uni-icons type="arrowright" size="15"></uni-icons> -->
					<uni-icons type="arrowright"></uni-icons>
				</view>
				
			</view>
		</view>

	</view>
</template>

<script>
	import {mapState, mapMutations} from "vuex"
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['userinfo'])
		},
		methods: {
			...mapMutations('m_user',['updateUserInfo','updateToken','updateAddress']),
			async logout(){
				const[err, succ] = await uni.showModal({
					title:"提示",
					content: "是否退出登录？",
				})
				if(succ && succ.confirm){
					this.updateUserInfo({})
					this.updateToken('')
					this.updateAddress({})
				}

			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container{
		height: 100%;
		background-color: #f4f4f4;
		
		.top-box{
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.avatar{
				height: 90px;
				width: 90px;
				border-radius: 45px;
				border: #fff solid 2px;
				box-shadow: 0 1px 5px black;
			}
			.nickname{
				color: white;
				font-weight: bold;
				font-size: 16px;
				margin-top: 10px;
			}
		}
		
		.panel-list{
			padding: 0 10px;
			position: relative;
			top: -10px;
			
			.panel{
				background-color: white;
				border-radius: 3px;
				margin-bottom: 8px;
				
				
				
				.panel-title{
					line-height: 45px;
					padding-left: 15px;
					font-size: 15px;
					border-bottom: 1px solid #f4f4f4;
				}
				
				.panel-body{
					display: flex;
					// justify-content: space-between;
					justify-content: space-around;
					.panel-item{
						font-size: 13px;
						padding: 10px 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						
						.icon{
							width: 35px;
							height: 35px;
						}
					}
				}
			}

		}
		.panel-list-item{
			font-size: 15px;
			line-height: 45px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			
		}
	}
</style>