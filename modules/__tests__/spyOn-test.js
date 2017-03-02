import expect, { spyOn, ANY } from '../index'

describe('A function that was spied on', () => {
  const video = {
    play: () => {}
  }

  let spy
  beforeEach(() => {
    spy = spyOn(video, 'play')
    video.play('some', 'args')
  })

  it('tracks the number of calls', () => {
    expect(spy.calls.length).toEqual(1)
  })

  it('tracks the context that was used', () => {
    expect(spy.calls[0].context).toBe(video)
  })

  it('tracks the arguments that were used', () => {
    expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
  })

  it('was called', () => {
    expect(spy).toHaveBeenCalled()
  })

  it('was called with the correct args', () => {
    expect(spy).toHaveBeenCalledWith('some', 'args')
  })

  it('was called once with the correct args', () => {
    video.play('other', 'args')
    expect(spy).toHaveBeenCalledWith('some', 'args')
    expect(spy).toHaveBeenCalledWith('other', 'args')
  })

  it('was called once with no args', () => {
    video.play()
    expect(spy).toHaveBeenCalledWith()
  })

  it('rejects a bad arg', () => {
    try {
      expect(spy).toHaveBeenCalledWith('some', 'wrong')
    } catch (err) {
      expect(err.message).toMatch('spy was never called with')
    }
  })

  it('rejects missing args', () => {
    try {
      expect(spy).toHaveBeenCalledWith()
    } catch (err) {
      expect(err.message).toMatch('spy was never called with')
    }
  })

  it('was called with an ignored arg', () => {
    expect(spy).toHaveBeenCalledWith('some', ANY)
  })

  it('rejects a faked ANY arg', () => {
    try {
      expect(spy).toHaveBeenCalledWith('some', {})
    } catch (err) {
      expect(err.message).toMatch('spy was never called with')
    }
  })

  it('can be restored', () => {
    expect(video.play).toEqual(spy)
    spy.restore()
    expect(video.play).toNotEqual(spy)
  })
})

describe('A function that was spied on but not called', () => {
  const video = {
    play: () => {}
  }

  let spy
  beforeEach(() => {
    spy = spyOn(video, 'play')
  })

  it('number of calls to be zero', () => {
    expect(spy.calls.length).toEqual(0)
  })

  it('was not called', () => {
    expect(spy).toNotHaveBeenCalled()
  })
})
