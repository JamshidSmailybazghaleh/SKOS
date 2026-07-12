package com.smaily.skos.dashboard

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class DashboardViewModel {

    private val _state =
        MutableStateFlow(DashboardState())

    val state: StateFlow<DashboardState>
        get() = _state

    fun update(state: DashboardState) {

        _state.value = state

    }

}
