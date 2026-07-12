############################################################
# SKOS
# Smaily Knowledge Operating System
#
# BUILD-000198
# File : proguard-rules.pro
# Version : 1.0.0
############################################################

# Preserve source information for debugging
-keepattributes SourceFile,LineNumberTable

# Preserve annotations
-keepattributes *Annotation*

# Keep Kotlin metadata
-keep class kotlin.Metadata { *; }

# Keep Application class
-keep class com.smaily.skos.SKOSApplication {
    *;
}

# Keep MainActivity
-keep class com.smaily.skos.MainActivity {
    *;
}

# Keep Runtime package
-keep class com.smaily.skos.runtime.** {
    *;
}

# Keep UI Theme package
-keep class com.smaily.skos.ui.theme.** {
    *;
}

# Do not warn about Kotlin
-dontwarn kotlin.**

# Do not warn about AndroidX
-dontwarn androidx.**
