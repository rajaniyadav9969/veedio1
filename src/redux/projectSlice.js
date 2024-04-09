import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from "uuid"

const initialState = {
  background: {isColor: true, data: "#000"},
  duration: "automatic",
  size: '16:9',
  frames: '30',
  media: {
    length: 0,
    data: []
  }
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    updateValues: (state, action) => {
        state[action.payload.name] = action.payload.value
    },
    addMedia: (state, action) => {
      const isVid = action.payload.frames.length
      state.media.length += action.payload.frames.length || 1
      const frames = isVid ? action.payload.frames : [action.payload.media]
      state.media.data = [...state.media.data, {media: action.payload.media, frames, isVid, id: uuid()}]
    },
  },
})

export const { updateValues, addMedia } = projectSlice.actions

export default projectSlice.reducer