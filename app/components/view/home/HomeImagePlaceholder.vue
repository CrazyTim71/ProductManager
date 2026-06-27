<template>
    <article class="home-image-placeholder">
        <div class="home-image-placeholder_frame">
            <div class="home-image-placeholder_glow"/>
            <div class="home-image-placeholder_label">{{ label }}</div>
            <img
                v-if="image"
                :alt="title"
                class="home-image-placeholder_img"
                :src="image"
            >
            <div
                v-else
                class="home-image-placeholder_visual"
            >
                <div class="home-image-placeholder_visual-line"/>
                <div class="home-image-placeholder_visual-line home-image-placeholder_visual-line--short"/>
                <div class="home-image-placeholder_visual-block"/>
                <div class="home-image-placeholder_visual-line"/>
            </div>
        </div>
        <h4 class="home-image-placeholder_title">{{ title }}</h4>
        <p class="home-image-placeholder_caption">{{ caption }}</p>
    </article>
</template>

<script setup lang="ts">
defineProps<{
    label: string;
    title: string;
    caption: string;
    image?: string;
}>();
</script>

<style scoped lang="scss">
.home-image-placeholder {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &_frame {
        position: relative;

        overflow: hidden;

        min-height: 170px;
        padding: 14px;
        border: none;
        border-radius: 14px;

        background: linear-gradient(120deg, varToRgba(darkgray900, 0.98), varToRgba(darkgray850, 0.95));

        &::before {
            content: none;
        }

        &::after {
            pointer-events: none;
            content: '';

            position: absolute;
            z-index: 0;
            inset: 0;

            border-radius: inherit;

            opacity: 0.9;
            background:
                radial-gradient(120px 24px at 7% 0%, varToRgba(info300, 0.34), transparent 72%),
                radial-gradient(116px 20px at 92% 100%, varToRgba(primary300, 0.3), transparent 72%);
        }

        > * {
            position: relative;
            z-index: 1;
        }
    }

    &_glow {
        position: absolute;
        top: -55%;
        right: -35%;

        width: 210px;
        height: 210px;
        border-radius: 50%;

        background: radial-gradient(circle, varToRgba(info500, 0.5) 0%, varToRgba(info500, 0) 68%);
        filter: blur(5px);
    }

    &_label {
        position: relative;
        z-index: 1;

        width: fit-content;
        padding: 4px 9px;
        border: 1px solid varToRgba(info500, 0.6);
        border-radius: 999px;

        font-size: 11px;
        font-weight: 700;
        color: $lightgray0;
        letter-spacing: 0.04em;

        background: varToRgba(info700, 0.3);
    }

    &_img {
        position: relative;
        z-index: 1;

        display: block;

        width: calc(100% + 28px);
        margin: 10px -14px -14px;
        border-radius: 0 0 14px 14px;

        object-fit: cover;
        object-position: top;
    }

    &_visual {
        position: relative;
        z-index: 1;

        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;

        margin-top: 20px;
    }

    &_visual-line {
        height: 10px;
        border-radius: 6px;
        background: varToRgba(lightgray200, 0.26);

        &--short {
            width: 72%;
        }
    }

    &_visual-block {
        height: 55px;
        border-radius: 10px;
        background: linear-gradient(130deg, varToRgba(primary500, 0.3), varToRgba(info400, 0.28));
        box-shadow: inset 0 0 0 1px varToRgba(lightgray125, 0.35);
    }

    &_title {
        margin: 0;
        font-size: 17px;
        color: $lightgray0;
    }

    &_caption {
        margin: 0;
        line-height: 1.45;
        color: $lightgray300;
    }
}
</style>
