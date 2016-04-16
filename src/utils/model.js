export function updateModelFields (model, updateValues) {
  for (let key in updateValues) {
    model[key] = updateValues[key];
  }
}
