<template>
	<li class="card">
		<h2 class="card__title">{{ parentData.name }}</h2>
		<div 
			class="card__body d-flex" 
			:class="watchCapacity(parentData.percentage)"
		>
			<div class="card__water">
				<div
					class="card__inner" 
					:style="{height: parentData.percentage + '%'}"
				></div>
			</div>
			<div class="card__percent">{{ Math.round(parentData.percentage * 10) / 10 }}%</div>
		</div>
		<div class="card__foot info">
			<p class="info__aval">有效蓄水量：{{ parentData.volumn }} 萬立方公尺</p>
			<p
				class="info__flow"
				:class="{
					'js-text__danger' : isDecend(),
					'js-text__peace' : !isDecend(),
				}"
			>
				<span v-if="isDecend()">昨日水量下降 </span>
				<span v-else>昨日水量上升 </span>
				{{ isNaN(calcWaterFlow())? "資料有誤..." : calcWaterFlow() + "%" }}
			</p>
			<p class="info__date">{{ parentData.updateAt }}</p>
		</div>
	</li>
</template>
<script>
	export default {
		props: {
			parentData: Object,
		},
		methods: {
			isDecend() {
				return (
					(
						(this.parentData.daliyNetflow /
							parseFloat(this.parentData.baseAvailable)) *
						100
					).toFixed(2) > 0 
				);
			},
			calcWaterFlow() {
				return Math.abs(
					(
						(this.parentData.daliyNetflow /
							parseFloat(this.parentData.baseAvailable)) *
						100
					).toFixed(2)
				);
			},
			watchCapacity(val) {
				if (val < 30) {
					return "js-circle__danger";
				}
				if (val < 50) {
					return "js-circle__orange";
				}
				return "js-circle__peace";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.card {
		width: 25%;
		padding: {
			left: 15px;
			right: 15px;
		}
		box-sizing: border-box;
		margin: {
			bottom: 75px;
		}
		&__title {
			font: {
				weight: 600;
				size: 22px;
			}
			text-align: center;
		}
		&__body {
			position: relative;
			width: 100%;
			height: auto;
			aspect-ratio: 1/1;
			border: {
				width: 5px;
				style: solid;
				radius: 50%;
			}
			margin: {
				top: 24px;
				bottom: 24px;
			}
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		&__water {
			position: absolute;
			width: 95%;
			height: 95%;
			border-radius: 50%;
			overflow: hidden;
		}
		&__inner {
			position: absolute;
			bottom: 0;
			width: 100%;
		}

		&__percent {
			position: absolute;
			font: {
				size: 60px;
			}
		}
		.info {
			&__aval,
			&__flow,
			&__date {
				margin: {
					bottom: 12px;
				}
			}
			&__date {
				color: #999;
			}
		}
	}
	.js {
		&-text {
			&__peace {
				color: #178bca;
			}
			&__danger {
				color: #f44;
			}
		}
		&-circle {
			&__peace {
				border: {
					color: #178bca;
				}
				.card {
					&__inner {
						background: {
							color: #178bcaee;
						}
					}

					&__percent {
						color: #0d6bb5;
					}
				}
			}
			&__orange {
				border: {
					color: #ffa077;
				}
				.card {
					&__inner {
						background: {
							color: #ffa077ee;
						}
					}

					&__percent {
						color: #f17b48;
					}
				}
			}
			&__danger {
				border: {
					color: #f44;
				}
				.card {
					&__inner {
						background: {
							color: #ff4444ee;
						}
					}

					&__percent {
						color: #f44;
					}
				}
			}
		}
	}
</style>