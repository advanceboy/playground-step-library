customSteps.addAdminColorSchemeBranding = function() {
    var steps = [
    {
        "step": "mkdir",
        "path": "wordpress/wp-content/mu-plugins"
    },
    {
        "step": "writeFile",
        "path": "wordpress/wp-content/mu-plugins/add-admin-color-scheme-branding.php",
        "data": "<?php\n/**\n * Plugin Name: Add Admin Color Scheme Branding\n * Plugin URI: https://github.com/felixarntz/felixarntz-mu-plugins\n * Description: Adds an admin color scheme reflecting the site specific brand colors.\n * Author: Felix Arntz\n * Author URI: https://felix-arntz.me\n * License: GPLv2 or later\n * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html\n * Text Domain: felixarntz-mu-plugins\n *\n * @package felixarntz-mu-plugins\n */\n\nnamespace Felix_Arntz\\MU_Plugins;\n\nif ( ! defined( 'ABSPATH' ) ) {\n\texit; // Exit if accessed directly.\n}\n\nrequire_once __DIR__ . '/shared/loader.php';\n\nadd_action(\n\t'admin_init',\n\tstatic function () {\n\t\t$config = Shared\\Config::instance();\n\n\t\t// Required colors.\n\t\t$colors = array(\n\t\t\t'base_color'      => $config->get( 'admin_color_scheme_base_color', '#1d2327' ),\n\t\t\t'icon_color'      => $config->get( 'admin_color_scheme_icon_color', '#a7aaad' ),\n\t\t\t'text_color'      => $config->get( 'admin_color_scheme_text_color', '#fff' ),\n\t\t\t'highlight_color' => $config->get( 'admin_color_scheme_highlight_color', '#2271b1' ),\n\t\t\t'accent_color'    => $config->get( 'admin_color_scheme_accent_color', '#d63638' ),\n\t\t\t'link_color'      => $config->get( 'admin_color_scheme_link_color', '#0073aa' ),\n\t\t);\n\n\t\t// Optional colors.\n\t\t$colors['secondary_base_color'] = $config->get( 'admin_color_scheme_secondary_base_color', '' );\n\t\t$colors['secondary_text_color'] = $config->get( 'admin_color_scheme_secondary_text_color', '' );\n\t\tif ( ! $colors['secondary_base_color'] ) {\n\t\t\t$colors['secondary_base_color'] = Shared\\Color_Utils::darken_hsl(\n\t\t\t\tShared\\Color_Utils::hex_to_hsl( $colors['base_color'] ),\n\t\t\t\t7\n\t\t\t);\n\t\t}\n\t\tif ( ! $colors['secondary_text_color'] ) {\n\t\t\t$colors['secondary_text_color'] = Shared\\Color_Utils::darken_hsl(\n\t\t\t\tShared\\Color_Utils::hex_to_hsl( $colors['text_color'] ),\n\t\t\t\t7\n\t\t\t);\n\t\t}\n\n\t\t// Computed colors.\n\t\t$colors['base_color_alt']           = Shared\\Color_Utils::lighten_hsl(\n\t\t\tShared\\Color_Utils::hex_to_hsl( $colors['base_color'] ),\n\t\t\t7\n\t\t);\n\t\t$colors['highlight_color_alt']      = Shared\\Color_Utils::darken_hsl(\n\t\t\tShared\\Color_Utils::hex_to_hsl( $colors['highlight_color'] ),\n\t\t\t10\n\t\t);\n\t\t$colors['accent_color_alt']         = Shared\\Color_Utils::lighten_hsl(\n\t\t\tShared\\Color_Utils::hex_to_hsl( $colors['accent_color'] ),\n\t\t\t10\n\t\t);\n\t\t$colors['link_color_alt']           = Shared\\Color_Utils::lighten_hsl(\n\t\t\tShared\\Color_Utils::hex_to_hsl( $colors['link_color'] ),\n\t\t\t10\n\t\t);\n\t\t$colors['secondary_base_color_alt'] = $colors['secondary_base_color'];\n\t\tif ( ! is_array( $colors['secondary_base_color_alt'] ) ) {\n\t\t\t$colors['secondary_base_color_alt'] = Shared\\Color_Utils::hex_to_hsl( $colors['secondary_base_color_alt'] );\n\t\t}\n\t\t$colors['secondary_base_color_alt'] = Shared\\Color_Utils::desaturate_hsl( Shared\\Color_Utils::lighten_hsl( $colors['secondary_base_color_alt'], 7 ), 7 );\n\n\t\t// Block editor colors (not used in color scheme CSS file).\n\t\t$block_editor_colors['color']                = Shared\\Color_Utils::hex_to_hsl( $colors['accent_color'] );\n\t\t$block_editor_colors['color-darker-10']      = Shared\\Color_Utils::darken_hsl( $block_editor_colors['color'], 5 );\n\t\t$block_editor_colors['color-darker-20']      = Shared\\Color_Utils::darken_hsl( $block_editor_colors['color'], 10 );\n\t\t$block_editor_colors['color--rgb']           = Shared\\Color_Utils::hsl_to_rgb( $block_editor_colors['color'] );\n\t\t$block_editor_colors['color-darker-10--rgb'] = Shared\\Color_Utils::hsl_to_rgb( $block_editor_colors['color-darker-10'] );\n\t\t$block_editor_colors['color-darker-20--rgb'] = Shared\\Color_Utils::hsl_to_rgb( $block_editor_colors['color-darker-20'] );\n\n\t\t// Turn all HSL colors back into HEX colors as they were only modified for color processing.\n\t\tforeach ( $colors as $color_id => $color_value ) {\n\t\t\tif ( is_array( $color_value ) && isset( $color_value['h'] ) ) {\n\t\t\t\t$colors[ $color_id ] = Shared\\Color_Utils::hsl_to_hex( $color_value );\n\t\t\t}\n\t\t}\n\t\tforeach ( $block_editor_colors as $color_var => $color_value ) {\n\t\t\tif ( is_array( $color_value ) && isset( $color_value['h'] ) ) {\n\t\t\t\t$block_editor_colors[ $color_var ] = Shared\\Color_Utils::hsl_to_hex( $color_value );\n\t\t\t}\n\t\t}\n\n\t\t$suffix = is_rtl() ? '-rtl' : '';\n\n\t\twp_admin_css_color(\n\t\t\t'brand',\n\t\t\t_x( 'Brand', 'admin color scheme', 'felixarntz-mu-plugins' ),\n\t\t\tplugin_dir_url( __FILE__ ) . \"admin-css-color-scheme/colors$suffix.css\",\n\t\t\tarray(\n\t\t\t\tShared\\Color_Utils::to_css_string( $colors['highlight_color'] ),\n\t\t\t\tShared\\Color_Utils::to_css_string( $colors['secondary_base_color'] ),\n\t\t\t\tShared\\Color_Utils::to_css_string( $colors['base_color'] ),\n\t\t\t\tShared\\Color_Utils::to_css_string( $colors['accent_color'] ),\n\t\t\t),\n\t\t\tarray(\n\t\t\t\t'base'    => $colors['icon_color'],\n\t\t\t\t'focus'   => $colors['text_color'],\n\t\t\t\t'current' => $colors['text_color'],\n\t\t\t)\n\t\t);\n\n\t\t/*\n\t\t * If the color scheme is currently in use, make sure to include the corresponding CSS variables.\n\t\t * Also include them when on the profile page, to immediately reflect the correct colors if the user changes\n\t\t * the color scheme.\n\t\t */\n\t\t$current_color_scheme = get_user_option( 'admin_color' );\n\t\tif ( 'brand' === $current_color_scheme || isset( $GLOBALS['pagenow'] ) && 'profile.php' === $GLOBALS['pagenow'] ) {\n\t\t\t$inline_css = ':root {';\n\t\t\tforeach ( $colors as $color_id => $color_value ) {\n\t\t\t\t$inline_css .= ' --brand-color-scheme-' . str_replace( '_', '-', $color_id ) . ':';\n\t\t\t\t$inline_css .= ' ' . esc_attr( Shared\\Color_Utils::to_css_string( $color_value ) ) . ';';\n\t\t\t}\n\t\t\tforeach ( $block_editor_colors as $color_var => $color_value ) {\n\t\t\t\t$inline_css .= ' --wp-admin-theme-' . $color_var . ':';\n\t\t\t\t$inline_css .= ' ' . esc_attr( Shared\\Color_Utils::to_css_string( $color_value ) ) . ';';\n\t\t\t}\n\t\t\t$inline_css .= ' }';\n\t\t\twp_add_inline_style( 'colors', $inline_css );\n\t\t}\n\n\t\t// If enforced, hook in relevant logic.\n\t\tif ( $config->get( 'admin_color_scheme_enforced', false ) ) {\n\t\t\t// Remove default color schemes, unless previously explicitly selected.\n\t\t\t$default_color_schemes = array(\n\t\t\t\t'fresh',\n\t\t\t\t'light',\n\t\t\t\t'blue',\n\t\t\t\t'midnight',\n\t\t\t\t'sunrise',\n\t\t\t\t'ectoplasm',\n\t\t\t\t'ocean',\n\t\t\t\t'coffee',\n\t\t\t\t'modern',\n\t\t\t);\n\t\t\tforeach ( $default_color_schemes as $color_scheme ) {\n\t\t\t\tif ( $color_scheme !== $current_color_scheme ) {\n\t\t\t\t\tunset( $GLOBALS['_wp_admin_css_colors'][ $color_scheme ] );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Override the default color scheme.\n\t\t\tadd_filter(\n\t\t\t\t'get_user_option_admin_color',\n\t\t\t\tstatic function ( $value ) {\n\t\t\t\t\treturn $value ? $value : 'brand';\n\t\t\t\t}\n\t\t\t);\n\n\t\t\t// Add hidden input for default color scheme to ensure the custom scheme remains selected.\n\t\t\tadd_action(\n\t\t\t\t'personal_options',\n\t\t\t\tstatic function () {\n\t\t\t\t\tif ( count( $GLOBALS['_wp_admin_css_colors'] ) <= 1 || ! has_action( 'admin_color_scheme_picker' ) ) {\n\t\t\t\t\t\techo '<input type=\"hidden\" name=\"admin_color\" value=\"brand\" />';\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t);\n\t\t}\n\t}\n);\n"
    },
    {
        "step": "unzip",
        "zipFile": {
            "resource": "url",
            "url": "https://raw.githubusercontent.com/akirk/playground-step-library/main/felixarntz-mu-plugins-shared.zip"
        },
        "extractToPath": "/wordpress/mu-plugins"
    }
];
    return steps;
}
customSteps.addAdminColorSchemeBranding.info = "Adds an admin color scheme reflecting the site specific brand colors.";
