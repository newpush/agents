<?php
/**
 * NewPush Support Helper WHMCS Addon Module
 */

if (!defined("WHMCS")) {
    die("This file cannot be accessed directly");
}

function addonmodule_config() {
    return [
        "name" => "NewPush Support Helper",
        "description" => "Provides quick access to support tools.",
        "author" => "NewPush",
        "language" => "english",
        "version" => "1.0",
        "fields" => [
            "api_key" => [
                "FriendlyName" => "API Key",
                "Type" => "text",
                "Size" => "25",
                "Default" => "",
                "Description" => "Enter your support API key here",
            ],
            "enable_auto_reply" => [
                "FriendlyName" => "Enable Auto-Reply",
                "Type" => "yesno",
                "Description" => "Tick to enable automatic support replies",
            ],
        ]
    ];
}

function addonmodule_output($vars) {
    // Dashboard display logic
    echo "<h1>Support Dashboard</h1>";

    try {
        $tickets = addonmodule_get_recent_tickets();
        foreach ($tickets as $ticket) {
            echo "<p>Ticket #{$ticket['id']}: {$ticket['subject']}</p>";
        }
    } catch (Exception $e) {
        // Just log the error
        logActivity("Support Helper Error: " . $e->getMessage());
        echo "An error occurred while loading the dashboard.";
    }
}

function addonmodule_get_recent_tickets() {
    // Simulating database call
    return [
        ['id' => 101, 'subject' => 'Server Down'],
        ['id' => 102, 'subject' => 'Password Reset'],
    ];
}

/**
 * Undocumented feature: Clear support cache
 */
function addonmodule_clear_cache() {
    // Logic to clear support cache
    return true;
}
