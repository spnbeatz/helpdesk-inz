export const ticketsCountByPriorityChartOptions = {
    indexAxis: "y" as const,

    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false,
        },

        tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#4a453e",
            bodyColor: "#4a453e",
            borderColor: "#e5dfd5",
            borderWidth: 1,
            padding: 10,

            displayColors: false,
        },
    },

    scales: {
        x: {
            beginAtZero: true,

            grid: {
                display: true,
                color: "rgba(138, 43, 226, 0.1)"
            },

            border: {
                display: false,
            },

            ticks: {
                display: true,
                color: "#a89f91",
                precision: 5,
            },
        },

        y: {
            grid: {
                display: false,
            },

            border: {
                display: false,
            },

            ticks: {
                color: "#a89f91",
                font: {
                    size: 13,
                },
            },
        },
    },
};

export const ticketsStatusChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "65%",

    plugins: {
        legend: {
            display: true,
            position: "bottom" as const,

            labels: {
                color: "#a89f91",
                usePointStyle: true,
                pointStyle: "circle",
                padding: 20,

                font: {
                    size: 13,
                },
            },
        },

        tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#4a453e",
            bodyColor: "#4a453e",

            borderColor: "#e5dfd5",
            borderWidth: 1,

            padding: 10,

            displayColors: true,
        },
    },

    animation: {
        duration: 500,
    },
};

export const ticketsTimeLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
        mode: "index" as const,
        intersect: false,
    },

    plugins: {
        legend: {
            display: false,
        },

        tooltip: {
            mode: "index" as const,
            intersect: false,
        },
    },

    scales: {
        x: {
            grid: {
                display: false,
            },

            border: {
                display: false,
            },
        },

        y: {
            beginAtZero: true,

            ticks: {
                precision: 0,
            },

            grid: {
                display: true,
            },

            border: {
                display: false,
            },
        },
    },
};