<template>
    <component
        :is="as"
        class="common-neon-runner-container"
        :style="styleVars"
    >
        <slot/>
    </component>
</template>

<script setup lang="ts">
type NeonRunnerTone = 'primary' | 'secondary' | 'error' | 'warning' | 'info';

const props = withDefaults(defineProps<{
    as?: string;
    tone?: NeonRunnerTone;
    radius?: string;
}>(), {
    as: 'div',
    tone: 'primary',
    radius: '18px',
});

const toneStyles: Record<NeonRunnerTone, { base: string; mid: string; bright: string }> = {
    primary: {
        base: '#512da8',
        mid: '#7c59bc',
        bright: '#a287d0',
    },
    secondary: {
        base: '#2d512a',
        mid: '#587c58',
        bright: '#86b287',
    },
    error: {
        base: '#a92d46',
        mid: '#bb5866',
        bright: '#d08690',
    },
    warning: {
        base: '#a97d2d',
        mid: '#bb9d58',
        bright: '#d0c686',
    },
    info: {
        base: '#2da990',
        mid: '#58bbad',
        bright: '#86d0c6',
    },
};

const styleVars = computed(() => ({
    '--runner-base': toneStyles[props.tone].base,
    '--runner-mid': toneStyles[props.tone].mid,
    '--runner-bright': toneStyles[props.tone].bright,
    '--runner-radius': props.radius,
}));

defineSlots<{
    default: () => any;
}>();
</script>

<style lang="scss">
/* @property must be global — not scoped — for animated conic-gradient to work */
@property --runner-angle {
    inherits: false;
    initial-value: 0deg;
    syntax: '<angle>';
}
</style>

<style scoped lang="scss">
.common-neon-runner-container {
    isolation: isolate;
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 14px;

    width: 100%;
    padding: 28px;
    border-radius: var(--runner-radius);

    background: linear-gradient(140deg, varToRgba(darkgray900, 0.9), varToRgba(darkgray1000, 0.92));
    box-shadow: 0 20px 50px -36px color-mix(in srgb, var(--runner-mid) 70%, transparent);

    /* Static dim border so the container has an edge even when the runner is on the other side */
    &::after {
        pointer-events: none;
        content: '';

        position: absolute;
        inset: 0;

        padding: 1px;
        border-radius: inherit;

        background: color-mix(in srgb, var(--runner-mid) 22%, transparent);

        mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
        mask-composite: xor;
        mask-composite: exclude;
    }

    /*
     * The runner: a conic-gradient whose `from` angle is animated via @property.
     * The element itself never rotates — only the gradient's start point moves,
     * so the bright arc travels along the border ring without any spinning-box artefact.
     */
    &::before {
        pointer-events: none;
        content: '';

        position: absolute;
        inset: 0;

        padding: 1.5px;
        border-radius: inherit;

        background: conic-gradient(
            from var(--runner-angle),
            transparent 0deg,
            transparent 300deg,
            color-mix(in srgb, var(--runner-base) 80%, transparent) 320deg,
            var(--runner-mid) 338deg,
            var(--runner-bright) 348deg,
            var(--runner-bright) 352deg,
            var(--runner-mid) 356deg,
            transparent 360deg
        );
        filter: drop-shadow(0 0 8px color-mix(in srgb, var(--runner-bright) 80%, transparent));

        mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
        mask-composite: xor;
        mask-composite: exclude;

        animation: common-neon-runner-travel 4.8s linear infinite;
    }

    > * {
        position: relative;
        z-index: 1;
    }
}

@keyframes common-neon-runner-travel {
    to {
        --runner-angle: 360deg;
    }
}
</style>
