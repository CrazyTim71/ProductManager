<template>
    <common-page title="ProductManager">
        <div
            ref="landingRoot"
            class="landing"
        >
            <div class="landing_background">
                <div class="landing_orb landing_orb--one neon-orb"/>
                <div class="landing_orb landing_orb--two neon-orb"/>
                <div class="landing_orb landing_orb--three neon-orb"/>
            </div>

            <common-neon-runner-container
                as="section"
                class="landing_hero"
                tone="info"
            >
                <span
                    class="landing_badge"
                    data-hero-item
                >Reparatur, Kommunikation, Fortschritt</span>
                <h2
                    class="landing_title"
                    data-hero-item
                >
                    Alles zu deinem Serviceauftrag in einer klaren Ansicht.
                </h2>
                <p
                    class="landing_subtitle"
                    data-hero-item
                >
                    ProductManager verbindet Kundenkommunikation, Reparatur-Workflow und Benachrichtigungen in einem zentralen Ablauf.
                    So sieht jede beteiligte Person sofort, was als Nächstes wichtig ist.
                </p>
                <div
                    class="landing_actions"
                    data-hero-item
                >
                    <ui-button
                        v-if="!store.me?.loggedIn"
                        to="/signup"
                    >
                        Konto erstellen
                    </ui-button>
                    <ui-button
                        v-else
                        to="/request/new"
                    >
                        Auftrag anlegen
                    </ui-button>
                    <ui-button
                        v-if="store.me?.loggedIn"
                        to="/request"
                        type="secondary"
                    >
                        Meine Anfragen
                    </ui-button>
                </div>
            </common-neon-runner-container>

            <common-neon-runner-container
                as="section"
                class="landing_section landing_section--features"
                data-reveal
                tone="primary"
            >
                <h3 class="landing_section-title">Funktionen auf einen Blick</h3>
                <p class="landing_section-subtitle">
                    Der Fokus liegt auf nachvollziehbaren Statuswechseln, direkter Kommunikation und sauberer Historie.
                </p>
                <div class="landing_feature-grid">
                    <home-feature-card
                        v-for="feature in features"
                        :key="feature.title"
                        :description="feature.description"
                        :icon="feature.icon"
                        :points="feature.points"
                        :title="feature.title"
                    />
                </div>
            </common-neon-runner-container>

            <common-neon-runner-container
                as="section"
                class="landing_section"
                data-reveal
                tone="secondary"
            >
                <h3 class="landing_section-title">Produktansichten</h3>

                <div class="landing_preview-grid">
                    <home-image-placeholder
                        v-for="preview in previews"
                        :key="preview.label"
                        :caption="preview.caption"
                        :image="preview.image"
                        :label="preview.label"
                        :title="preview.title"
                    />
                </div>
            </common-neon-runner-container>

            <common-neon-runner-container
                as="section"
                class="landing_section landing_section--cta"
                data-reveal
                tone="warning"
            >
                <h3 class="landing_section-title">Bereit für den nächsten Auftrag?</h3>
                <p class="landing_section-subtitle">
                    Lege eine neue Anfrage an oder springe direkt in die bestehende Historie, um den aktuellen Stand zu prüfen.
                </p>
                <div class="landing_actions landing_actions--center">
                    <ui-button to="/request/new">Neue Anfrage starten</ui-button>
                    <ui-button
                        to="/staff/request"
                        type="secondary"
                    >
                        Staff Übersicht
                    </ui-button>
                </div>
            </common-neon-runner-container>
        </div>
    </common-page>
</template>

<script setup lang="ts">
import { animate, stagger } from 'animejs';
import HomeFeatureCard from '~/components/view/home/HomeFeatureCard.vue';
import HomeImagePlaceholder from '~/components/view/home/HomeImagePlaceholder.vue';
import { useStore } from '~/store';

const store = useStore();
const landingRoot = ref<HTMLElement | null>(null);

const features = [
    {
        title: 'Durchgängiger Reparaturablauf',
        description: 'Von der Anfrage bis zur Auslieferung bleibt jeder Schritt dokumentiert und nachvollziehbar.',
        icon: 'material-symbols:route',
        points: [
            'Statushistorie inklusive Zeitbezug',
            'Arbeitsschritte mit klaren Phasen',
            'Archiv für abgeschlossene Aufträge',
        ],
    },
    {
        title: 'Direkte Kommunikation',
        description: 'Kunden und Staff arbeiten in einem Chatraum pro Auftrag zusammen, ohne Informationsverlust.',
        icon: 'material-symbols:forum-rounded',
        points: [
            'Live-Nachrichten via Socket.IO',
            'Systemeinträge für Statuswechsel',
            'Rollenbasierter Zugriff pro Raum',
        ],
    },
    {
        title: 'Benachrichtigungen mit Kontext',
        description: 'Neue Ereignisse werden sichtbar markiert und führen direkt zur passenden Detailansicht.',
        icon: 'material-symbols:notifications-active-rounded',
        points: [
            'Badge-Updates in Echtzeit',
            'Mark all read und Delete read Aktionen',
            'Direktes Routing zu Anfrage oder Chat',
        ],
    },
] as const;

const previews = [
    {
        label: 'Staff',
        title: 'Staff Cockpit',
        caption: 'Queue, Prioritäten und offene Fälle auf einen Blick.',
        image: '/docs/repair-request.png',
    },
    {
        label: 'Kommunikation',
        title: 'Direkte Kommunikation',
        caption: 'Status, Chat und Verlauf klar strukturiert auf einer Seite.',
        image: '/docs/chat.png',
    },
    {
        label: 'Workflow',
        title: 'Reparaturschritte',
        caption: 'Diagnose, Reparatur und QA inklusive Phasenfortschritt.',
        image: '/docs/graph.png',
    },
] as const;

onMounted(() => {
    const root = landingRoot.value;

    if (!root) {
        return;
    }

    const heroItems = root.querySelectorAll<HTMLElement>('[data-hero-item]');
    const revealTargets = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const orbs = root.querySelectorAll<HTMLElement>('.neon-orb');

    orbs.forEach((orb, index) => {
        animate(orb, {
            translateX: index % 2 === 0 ? 28 : -24,
            translateY: index === 1 ? -20 : 22,
            scale: index === 2 ? 1.16 : 1.08,
            duration: 4400,
            delay: index * 280,
            loop: true,
            alternate: true,
            ease: 'inOutSine',
        });
    });

    animate(heroItems, {
        opacity: [0, 1],
        translateY: [26, 0],
        duration: 820,
        delay: stagger(120, { start: 120 }),
        ease: 'outExpo',
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            animate(entry.target as HTMLElement, {
                opacity: [0, 1],
                translateY: [34, 0],
                duration: 760,
                ease: 'outExpo',
            });

            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.25,
    });

    revealTargets.forEach(target => {
        observer.observe(target);
    });
});
</script>

<style scoped lang="scss">
.landing {
    isolation: isolate;
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 38px;

    width: 100%;
    max-width: 90vw;
    margin: 0 auto;


    &_background {
        pointer-events: none;
        position: absolute;
        z-index: -1;
        inset: 0;
    }

    &_orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(18px);

        &--one {
            top: -40px;
            left: -20px;

            width: 260px;
            height: 260px;

            background: radial-gradient(circle at 30% 30%, varToRgba(info500, 0.46), varToRgba(info500, 0));
        }

        &--two {
            top: 320px;
            right: -40px;

            width: 210px;
            height: 210px;

            background: radial-gradient(circle at 30% 30%, varToRgba(primary500, 0.4), varToRgba(primary500, 0));
        }

        &--three {
            right: 26%;
            bottom: -120px;

            width: 280px;
            height: 280px;

            background: radial-gradient(circle at 30% 30%, varToRgba(secondary400, 0.32), varToRgba(secondary400, 0));
        }
    }

    &_hero,
    &_section {
        width: 100%;
    }

    &_hero {
        display: flex;
        flex-direction: column;
        gap: 14px;
        opacity: 1;
    }

    &_section {
        opacity: 0;
    }

    &_badge,
    &_title,
    &_subtitle,
    &_actions {
        opacity: 0;
    }

    &_badge {
        width: fit-content;
        padding: 4px 12px;
        border: 1px solid varToRgba(info500, 0.6);
        border-radius: 999px;

        font-size: 12px;
        color: $lightgray0;
        letter-spacing: 0.04em;

        background: linear-gradient(140deg, varToRgba(info700, 0.5), varToRgba(primary500, 0.3));
    }

    &_title {
        margin: 0;

        font-size: 42px;
        line-height: 1.1;
        color: $lightgray0;
        text-wrap: balance;
    }

    &_subtitle {
        max-width: 780px;
        margin: 0;

        font-size: 16px;
        line-height: 1.6;
        color: $lightgray200;
    }

    &_actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        &--center {
            justify-content: center;
        }
    }

    &_section {
        display: flex;
        flex-direction: column;
        gap: 14px;

        &--features {
            margin-top: 8px;
        }

        &--cta {
            text-align: center;
        }
    }

    &_section-title {
        margin: 0;
        font-size: 28px;
        color: $lightgray0;
    }

    &_section-subtitle {
        margin: 0;
        line-height: 1.55;
        color: $lightgray300;
    }

    &_feature-grid,
    &_preview-grid {
        display: grid;
        gap: 14px;
    }

    &_feature-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    &_preview-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @include mobile {
        gap: 24px;

        &_hero,
        &_section {
            padding: 20px;
        }

        &_title {
            font-size: 32px;
        }

        &_feature-grid,
        &_preview-grid {
            grid-template-columns: 1fr;
        }
    }
}

.neon-panel {
    backdrop-filter: blur(5px);
}

@keyframes neon-corner-pulse {
    from {
        transform: scale(1);
        opacity: 0.45;
    }

    to {
        transform: scale(1.02);
        opacity: 0.95;
    }
}
</style>

