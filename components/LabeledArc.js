class LabeledArc extends Arc {
  render() {
    let [labelX, labelY] = this.arc.centroid(this.props.data),
      labelTranslate = `translate(${labelX}, ${labelY})`;

    return (
      <Group>
        {super.render()}
        <text transform={labelTranslate}
          textAnchor="middle">
          {this.props.data.data.label}
        </text>
      </Group>
    )
  }
}

export { LabeledArc }
